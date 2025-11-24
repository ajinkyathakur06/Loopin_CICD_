import react from "react"
import { serverUrl } from "../App";
import { useDispatch,useSelector } from "react-redux";
import { setUserData,setFollowing } from "../redux/userSlice";   
import { useEffect } from "react";
import axios from "axios";
import { setPrevChatUsers } from "../redux/messageSlice";

function getPrevChatUsers(){
    const dispatch=useDispatch();
     const {messages}=useSelector(state=>state.message)
useEffect(()=>{
const fetchUser=async()=>{
    try{
        const result=await axios.get(`${serverUrl}/api/message/prevChats`,{withCredentials:true})
        dispatch(setPrevChatUsers(result.data))
        console.log("Prev Chat Users:",result.data);
    }catch(error){
    console.log(error)
}
}
fetchUser()
},[messages])
}
      
export default getPrevChatUsers;