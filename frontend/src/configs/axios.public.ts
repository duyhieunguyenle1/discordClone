import axios from "axios";

const DOMAIN_API = import.meta.env.VITE_DOMAIN_API

const axiosPublic = axios.create({
    baseURL:`${DOMAIN_API}/api/v1`,
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
})

export default axiosPublic