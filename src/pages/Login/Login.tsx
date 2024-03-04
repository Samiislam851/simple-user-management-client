
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import toast from 'react-hot-toast';

import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import axios from 'axios';

import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';




type Props = {}
type inputObject = {
    email: string,
    password: string
}



export default function Login({ }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false);




    const { setUser, logOut, emailSignIn, setLoggedIn, setLoading, setToken } = useAuth()!





    const { register, handleSubmit } = useForm<inputObject>()




    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };






    const loginFromDB = async (user: any) => {

        let retryCount = 0;
        const maxRetries = 4; // Maximum number of retry attempts
        const retryDelay = 20; // Delay between retry attempts in milliseconds
    
        while (retryCount < maxRetries) {
            try {
                const res = await axios.post('/login', user);
    
                if (res.status === 200) {
                    localStorage.setItem('user-management', res.data.token);
                    setToken(res.data.token);
                    setUser(user);
                    setLoggedIn(true);
                    setLoading(false);
                    return; // Exit function on successful login
                }
            } catch (error : any) {
                console.error('Error logging in to server:', error);
                if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                    // Retry only for 400 or 401 errors
                    if (retryCount === maxRetries - 1) {
                        // Max retries reached, logout and handle error
                        await logOut()
                        setLoading(false);
                        setIsLoading(false);
                        return;
                    }
                } else {
                    // Error other than 400 or 401, handle accordingly
                    setLoading(false);
                    setIsLoading(false);
                   
                    return;
                }
            }
    
            // Increment retry count and wait before retrying
            retryCount++;
            console.log(`Retrying login attempt ${retryCount} in ${retryDelay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }

    
        // Max retries reached without success
        console.error('Max retry attempts reached without successful login');
        setLoading(false);
        setIsLoading(false);
        logOut()
    };







    const handleLogin = (data: inputObject) => {
        if (/^\s*$/.test(data.email) || /^\s*$/.test(data.password)) {
            toast.error('Please Enter something ')
        } else {
            setIsLoading(true)
            setLoading(true)
            emailSignIn(data.email, data.password).then((userCredential) => {
                const user = userCredential.user;
                loginFromDB(user)
                setIsLoading(false);
           

            })
                .catch((error: any) => {
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    setLoading(false)
                    setIsLoading(false)
                });
        }
    }

    return (
        <>

            <div className='background min-h-[100vh] text-center flex flex-col-reverse md:flex-row gap-10 justify-center items-center '>
                <div className='w-fit '>
                    <div className='rounded-lg py-5 backdrop-blur-[2px] bg-gray-100 bg-opacity-20 border border-opacity-20 border-gray-400 max-w-md  transition-all ease-in-out duration-500 hover:shadow-2xl '>
                        <div className='w-fit mx-auto'>
                            <h3 className='text-3xl font-bold  text-white'>Users Atlas</h3>
                        </div>

                        <h3 className='text-xl text-white font-thin md:font-thin px-5 md:px-10 mb-6'>Sign in to you account</h3>

                        <form className='max-w-md  px-5 md:px-10 mx-auto flex flex-col items-center justify-center gap-1 pb-5' onSubmit={handleSubmit(handleLogin)} >
                            <input {...register('email')} className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300' type="text" placeholder='Enter your Email' />

                            <div className="relative m-2 w-full rounded-lg border">
                                <input
                                    {...register('password')}
                                    className="p-2  w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your Password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-0 right-0 mt-3 pe-1 text-gray-700 mr-2"
                                >
                                    {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                                </button>
                            </div>

                            <button className='border py-2 px-4 rounded-lg bg-[#924fdf] text-white hover:shadow-xl transition-all ease-in-out duration-300 hover:scale-105 border-0 '>
                                {isLoading ?
                                    <AiOutlineLoading3Quarters className='text-2xl animate-spin' />
                                    :
                                    <span>Login</span>
                                }
                            </button>
                        </form>
                        <div className='max-w-md  px-5 md:px-10'>
                            <h3 className='text-white text-center  text-sm py-3'> New to UsersAtlas? <span className='animate-pulse text-lg'> <Link to={'/register'} >Create an account!</Link> </span></h3>



                        </div>
                    </div>
                </div>



            </div></>


    )
}


