import { ReactNode } from "react"
import useAuth from "../../hooks/useAuth"
import { Navigate } from "react-router-dom"


type props = {

    children: ReactNode
}


const RestrictedPublicRoute = ({ children }: props) => {

    const { user } = useAuth()!


    return (
        <>
            {user ? <><Navigate to='/'/></> : <>{children}</>}

        </>
    )
}

export default RestrictedPublicRoute