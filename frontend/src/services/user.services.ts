import axiosProtected from '../configs/axios.protected';

const userApi = {
  getCurrentUser: async () => await axiosProtected.get('/user/current-user'),
  getUserById: async (id: string) => await axiosProtected.get(`/user/get-user/${id}`),
  getFriendsOfServer: async (id: string) =>
    await axiosProtected.post('/user/getFriends-notInServer', { serverId: id }),
};

export default userApi;
