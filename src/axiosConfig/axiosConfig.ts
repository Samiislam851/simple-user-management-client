import axios from 'axios'



const axiosConfig = ( token : string | null ) => {

axios.defaults.baseURL = `https://simple-user-management-dashboard-server.onrender.com/`

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