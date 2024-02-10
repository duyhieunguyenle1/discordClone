import axios from 'axios';
import { toast } from 'react-toastify';

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data.msg);
  } else {
    toast.error('Something went wrong, please try again or contact admin');
  }
};

export default handleAxiosError;
