import { User, UserCredential, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import app from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'

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
    user: User | null
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


    ////////////////////// Sign Out ////////////////////////////
    const logOut = () => {
        setLoading(true)
        signOut(auth).then(() => {
            setUser(null);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
        });
    }




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
        emailRegister, addUserDetails, logOut, emailSignIn, setLoading, loading, setLoggedIn, loggedIn, setUser, user
    }

    return (
        <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
    )
}

export default ContextProvider