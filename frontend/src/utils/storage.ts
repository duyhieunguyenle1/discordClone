import Cookie from 'js-cookie'

const storage = {
    setAccessToken:(token:string)=>{
        return localStorage.setItem('accessToken',token)
    },
    getAccessToken:()=>{
        return localStorage.getItem('accessToken')
    },
    clearAccessToken:()=>{
        return localStorage.removeItem('accessToken')
    },
    getRefreshToken:()=>{
        return Cookie.get('refreshToken')
    }
}

export default storage