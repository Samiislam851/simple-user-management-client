import { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from 'react-hot-toast';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

type Props = {};

type inputObject = {
    name: string,
    email: string,
    password: string,
    image: string
};

const RegisterPage = ({ }: Props) => {
    const [isLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);



    const { setLoggedIn, setLoading, addUserDetails, logOut, emailRegister,setToken } = useAuth()!;

    const { register, handleSubmit } = useForm<inputObject>();

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const saveUserToDB = async (user: any, retries = 3) => {
        try {
            const res = await axios.post('/saveUser', user);
            if (res.status === 200) {
                localStorage.setItem('user-management', res.data.token);
                setToken(res.data.token)
                setLoggedIn(true)
            } else {
                await logOut();
            }
        } catch (error) {
            if (retries > 0) {
                await saveUserToDB(user, retries - 1);
            } else {
                toast.error('Failed to save user to the database after multiple attempts.');
                await logOut();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = (data: inputObject) => {
        const userData = { ...data };
        setLoading(true);
        emailRegister(userData.email, userData.password)
            .then(() => {
                setLoading(true);
                addUserDetails(userData.name).then(() => {
                    setLoading(false);
                    console.log('Profile updated');
                }).catch((err) => {
                    toast.error(err.message);
                    setLoading(false);
                });
                saveUserToDB({
                    name: userData.name, ///////////////////////////////////////////////
                    email: userData.email,
                });
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
            });

    };




    return (
        <div className='background min-h-[100vh] text-center flex flex-col-reverse md:flex-row gap-10 justify-center items-center '>
            <div className='w-fit '>
                <div className='rounded-lg py-10 backdrop-blur-sm bg-white bg-opacity-20 border border-opacity-20 border-gray-400 max-w-md  transition-all ease-in-out duration-500   '>
                    <div className='w-fit mx-auto'>
                        <h3 className='text-3xl font-bold text-white'>Users Atlas</h3>
                    </div>

                    <h3 className='text-xl text-white font-thin md:font-thin px-5 md:px-10 mb-6'>Create an account</h3>

                    <form className='max-w-md  px-5 md:px-10 mx-auto flex flex-col items-center justify-center gap-1 pb-5' onSubmit={handleSubmit(handleRegister)} >
                        <input required {...register('name')} className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300' type="text" placeholder='Enter your Name' />


                        <input required {...register('email')}
                            className='p-2 m-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300'
                            type="text"
                            placeholder='Enter your Email'
                            autoComplete='current-email'

                        />
                        <div className="relative m-2 w-full rounded-lg border">
                            <input
                                {...register('password')}
                                className="p-2 w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-gray-300"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your Password"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-0 right-0 mt-3 pe-1 text-gray-700 mr-2"
                            >
                                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                            </button>
                        </div>
                        <button className={` border py-2 px-4 rounded-lg bg-[#924fdf] text-white hover:shadow-xl transition-all ease-in-out duration-300 hover:scale-105 border-0 `}>
                            {isLoading ?
                                <AiOutlineLoading3Quarters className='text-3xl animate-spin' />
                                :
                                <span>Register</span>
                            }
                        </button>
                    </form>
                    <div className='max-w-md  px-5 md:px-10'>
                        <h3 className='text-white text-center md:text-left text-sm py-3'>Already have an account? <span className='text-lg'> <Link to={'/login'}>Login and continue</Link> </span></h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
