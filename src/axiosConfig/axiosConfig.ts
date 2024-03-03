import axios from 'axios'



const axiosConfig = ( token : string | null ) => {

axios.defaults.baseURL = `http://localhost:3000/`

    axios.interceptors.request.use(

        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`

            }

            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

}

export default axiosConfig