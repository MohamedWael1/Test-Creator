import axios from "axios";
import auth from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const client = axios.create({
    baseURL: BASE_URL
})

client.interceptors.request.use(config =>{
    const user = auth.getUser();
    if(user){
        config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
})

client.interceptors.response.use(
    res => res,
    err => {
        if(err.response?.status === 401){
            auth.logout();
        }
    }
)

export default client;