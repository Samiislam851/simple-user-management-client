import { useContext } from "react"
import { GeneralContext } from "../providers/ContextProvider"

/// primary purpose for this hook is to eliminate the import statements every time 
 

const useAuth = () => {

    const contextValues = useContext(GeneralContext)

    return contextValues
}

export default useAuth