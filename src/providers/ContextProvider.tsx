import React, { ReactNode, createContext, useState } from 'react'

type Props = {
    children: ReactNode
}

interface valueType {
    setIsOnline: React.Dispatch<React.SetStateAction<boolean>>,
    isOnline: boolean
}







//////////////////// context declaration ///////////////

export const GeneralContext = createContext<valueType | null>(null)



const ContextProvider = ({ children }: Props) => {

    const [isOnline, setIsOnline] = useState(false)






    const value: valueType = {
        isOnline, setIsOnline
    }

    return (
        <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
    )
}

export default ContextProvider