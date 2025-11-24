import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSelectedUser } from "../redux/messageSlice";
import dp1 from '../assets/dp.jpg'

function OnlineUser({user}){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    return(
        <div className="W-[50px] H-[50px] flex gap-[20px]
         justify-start items-center relative">
            <div className='w-[40px] h-[40px] border-2 border-black
            rounded-full cursor-pointer overflow-hidden'
            onClick={()=>{dispatch(setSelectedUser(user))
            navigate(`/messageArea`)
            }}> 
            <img src={ user.profileImage || dp1} alt="" 
            className='w-full object-cover'/>
        <div className="w-[12px] h-[12px] bg-green-500
         border-2 border-black rounded-full 
         absolute top-0 right-0">

        </div>
        </div> 
        </div>
    )
}
export default OnlineUser;  