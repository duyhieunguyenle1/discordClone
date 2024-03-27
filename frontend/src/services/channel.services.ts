import axiosProtected from '../configs/axios.protected';

const channelApi = {
  getAllChannelsOfServer: async (id: string) =>
    await axiosProtected.get(`/channel/getChannelsOfServer/${id}`),
  getChannelOfServer: async (id1: string, id2: string) =>
    await axiosProtected.get(`/channel/getChannelOfServer/${id1}/${id2}`),
};

export default channelApi;
