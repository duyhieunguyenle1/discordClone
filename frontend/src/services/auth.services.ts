import { FieldValues } from "react-hook-form"
import axiosPublic from "../configs/axios.public"

const authApi = {
    login: async (data:FieldValues)=> await axiosPublic.post('/login',data),
    register:async (data:FieldValues) =>await axiosPublic.post('/register',data)
}

export default authApi