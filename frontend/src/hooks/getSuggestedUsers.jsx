import react from "react"
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setSuggestedUsers, setUserData } from "../redux/userSlice";   
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";   


function getSuggestedUsers(){
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
useEffect(()=>{
const fetchUser=async()=>{
    try{
        const result=await axios.get(`${serverUrl}/api/user/suggested`,{withCredentials:true})
        dispatch(setSuggestedUsers(result.data))
    }catch(error){
    console.log(error)
}
}
fetchUser()
},[userData])
}
      
export default getSuggestedUsers;