import { create } from "zustand";
import {axiosInstance}   from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get("/auth/authenticate-user");
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in the checkAuth state"+error.message);
            set({authUser: null})

        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signUp: async(data)=>{
        set({isSigningUp:true});
        try {
            const res= await axiosInstance.post("/auth/signup",data);
            console.log("response from server",res.data)
            set({authUser: res.data});
            toast.success("Signup successfully!");
            
        } catch (error) {
            toast.error(error.response.data.message);

        }finally{
            set({isSigningUp:false});
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            console.log("response from server",res.data)
            set({authUser: null});
            toast.success("Logout successfully!");
            
        } catch (error) {
            toast.error(error.response.data.message);

        }finally{
            set({isSigningUp:false});
        }
    },

    login: async(data)=>{
        set({isLoggingIn:true});
        try {
            const res= await axiosInstance.post("/auth/login",data);
            console.log("response from server",res.data)
            set({authUser: res.data});
            toast.success("Login successfully!");
            
        } catch (error) {
            toast.error(error.response.data.message);

        }finally{
            set({isLoggingIn:false});
        }
    }
}),);