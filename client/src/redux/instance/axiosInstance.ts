import axios from 'axios'

const axiosInstance=axios.create({
    baseURL:"http://localhost:7070/api",
    withCredentials:true
})

export default axiosInstance