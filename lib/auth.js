import client from "./client";

class Auth{
    constructor(){
        this.key = "__auth__";
        this.listeners = new Set()
    }

    async login(data){
       const res = await client.post("/api/users/login", data);
       this.storeUser(res.data)
       this.listeners.forEach(listener => listener(res.data))
       return res.data
    }

    async register(data){
        const res = await client.post("/api/users/register", data);
        this.storeUser(res.data)
        this.listeners.forEach(listener => listener(res.data))
        return res.data        
    }

    async logout(){
        this.listeners.forEach(listener => listener(null))
        this.removeUser()
    }

    storeUser(user){
        window.localStorage.setItem(this.key, JSON.stringify(user))

    }

    addListener(listener){
        this.listeners.add(listener);

        return () =>{
            this.listeners.delete(listener);
        }
    }

    removeUser(){
        window.localStorage.removeItem(this.key)
    }

    getUser(){
      const user = window.localStorage.getItem(this.key)
      return user ? JSON.parse(user) : null;
    }

}

const auth = new Auth()

export default auth;