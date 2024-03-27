import { FieldValues } from 'react-hook-form';
import axiosProtected from '../configs/axios.protected';

const serverApi = {
  createNewServer: async (data: FieldValues) =>
    await axiosProtected.post('/server/create-new', data),
  getServers: async () => await axiosProtected.get('/server/findAllServers'),
  getServerByParam: async (id: string) => await axiosProtected.get(`/server/findServerById/${id}`),
};

export default serverApi;
