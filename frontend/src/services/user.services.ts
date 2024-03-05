import axiosProtected from '../configs/axios.protected';

const userApi = {
  getCurrentUser: async () => await axiosProtected.get('/user/current-user'),
  getUserById: async (id: string) => await axiosProtected.get(`/user/get-user/${id}`),
};

export default userApi;
