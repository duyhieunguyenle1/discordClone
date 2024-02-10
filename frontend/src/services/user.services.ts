import axiosProtected from '../configs/axios.protected';

const userApi = {
  getCurrentUser: async () => await axiosProtected.get('/current-user'),
};

export default userApi;
