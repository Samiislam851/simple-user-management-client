import { User, UserCredential, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import app from '../firebase/firebaseConfig'
import axiosConfig from '../axiosConfig/axiosConfig'

type Props = {
    children: ReactNode
}

export interface valueType {
    loggedIn: boolean,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    emailRegister: (email: string, password: string) => Promise<UserCredential>,
    addUserDetails: (name: string) => Promise<void>,
    logOut: () => void,
    emailSignIn: (email: string, password: string) => Promise<UserCredential>,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    user: User | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}


export const GeneralContext = createContext<valueType | null>(null)

const ContextProvider = ({ children }: Props) => {


    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)


    const auth = getAuth(app);


    const emailRegister = (email: string, password: string) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const addUserDetails = (name: string) => {
        return updateProfile(auth.currentUser!, {
            displayName: name
        })
    }


    const emailSignIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)

    }


    const logOut = () => {
        setLoading(true)
        signOut(auth).then(() => {
            setUser(null);
            setLoading(false)
            setToken(null)
            localStorage.removeItem('user-management')
        }).catch((error) => {
            console.log(error);
        });
    }



    const [token, setToken] = useState<string|null>(localStorage.getItem('user-management'))

    useEffect(() => {
        axiosConfig(token)
    }, [token])











    useEffect(() => {

        console.log('outside auth state changed unsubscribe');
        const unsubscribe = onAuthStateChanged(auth, (loggedUser: User | null) => {
            setUser(loggedUser)
            console.log('on auth state changed func user:', loggedUser);
            setLoading(false)
        });

        console.log('user ::: after onAuthStateChanged', user);

        return () => {
            console.log('unsubscribing');
            unsubscribe()
        }
    }, [])

    console.log(user);




    const value: valueType = {
        emailRegister, addUserDetails, logOut, emailSignIn, setLoading, loading, setLoggedIn, loggedIn, setUser, user, setToken
    }

    return (
        <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
    )
}

export default ContextProvider