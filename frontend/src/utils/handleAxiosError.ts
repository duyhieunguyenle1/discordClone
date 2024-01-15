import axios from "axios"
import { toast } from "react-toastify"

const handleAxiosError = (error:unknown) => {
    if(axios.isAxiosError(error)){
        console.log(error)
        toast.error(error.response?.data|| error.message)
    }else{
        toast.error('Something went wrong, please try again or contact admin')
    }
}

export default handleAxiosError