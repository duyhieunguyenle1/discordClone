import Cookie from 'js-cookie';

const storage = {
  setAccessToken: (token: string) => {
    return localStorage.setItem('accessToken', token);
  },
  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },
  clearAccessToken: () => {
    return localStorage.removeItem('accessToken');
  },
  getUserId: () => {
    return Cookie.get('userId');
  },
  clearUserId: () => {
    return Cookie.remove('userId');
  },
};

export default storage;
