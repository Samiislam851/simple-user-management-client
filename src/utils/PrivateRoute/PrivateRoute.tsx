import { ReactNode } from "react"
import useAuth from "../../hooks/useAuth"
import { Navigate } from "react-router-dom"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

type Props = {
    children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
    const { user, loading } = useAuth()!;
    console.log('user from private route', user);
    if (!loading) {

        return (
            <> {!user ? <Navigate to='/login' /> : <>{children}</>}</>
        )

    }
    else return <> 
    
    <div 
    className='w-screen my-40'>
        
         <AiOutlineLoading3Quarters 
         className='text-5xl text-center animate-spin mx-auto' />
    </div></>
}

export default PrivateRoute