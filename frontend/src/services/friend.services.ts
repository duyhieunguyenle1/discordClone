import { FieldValues } from 'react-hook-form';
import axiosProtected from '../configs/axios.protected';

const friendApi = {
  sendInvite: async (data: FieldValues) => await axiosProtected.post('/friend/invite', data),
  rejectInvite: async (id: string) => await axiosProtected.post('/friend/reject', { id }),
  acceptInvite: async (id: string) => await axiosProtected.post('/friend/accept', { id }),
};

export default friendApi;
