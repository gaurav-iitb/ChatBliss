import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
export const loginCall = async (userCredential,dipatch) =>{
    dipatch({type: "LOGIN_START"});
    try{
        const res = await axiosInstance.post("/auth/login",userCredential);
        dipatch({type: "LOGIN_SUCCESS",payload: res.data})
    }
    catch(err){
        dipatch({type: "LOGIN_FAILURE",payload: err})
    }
}