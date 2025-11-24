import react from "react"
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import {setFollowing } from "../redux/userSlice";   
import { useEffect } from "react";
import axios from "axios";

function getFollowingList(){
    const dispatch=useDispatch()
useEffect(()=>{
const fetchUser=async()=>{
    try{
        const result=await axios.get(`${serverUrl}/api/user/followingList`,{withCredentials:true})
        dispatch(setFollowing(result.data))
    }catch(error){  
    console.log(error)
}
}
fetchUser()
},[])
}
      
export default getFollowingList;