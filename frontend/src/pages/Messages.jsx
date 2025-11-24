import React from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import OnlineUser from '../components/onlineUser.jsx';
import { setSelectedUser } from '../redux/messageSlice.js';
import dp1 from '../assets/dp.jpg'

function Messages() {
  const navigate=useNavigate();
  const {userData}=useSelector(state=>state.user)
   const {onlineUsers}=useSelector(state=>state.socket)
   const {prevChatUsers,selectedUsers}=useSelector(state=>state.message)
    const dispatch=useDispatch();
   return (
        <div className=' w-full min-h-[100vh] flex flex-col 
        bg-black gap-[20px] p-[10px]'>

            <div className="w-full h-[80px] flex items-center gap-5 px-5">
                   <IoArrowBackOutline
                     className="text-white w-[25px] h-[25px] cursor-pointer lg:hidden "
                     onClick={() => navigate(`/`)}
                   />
                   <h1 className="text-white font-semibold text-[20px]">Messages</h1>
                 </div>
                 <div className='w-full h-[80px] flex gap-[20px]
                 justify-start items-center overflow-x-auto
                 p-[20px] border-b-2 border-gray-800'>
                  {userData.following?.map((user,index)=>(
                      (onlineUsers?.includes(user._id)) && <OnlineUser user={user}/>
                  ))}
                 </div>
                 <div className='w-full h-full overflow-auto  flex flex-col gap-[20px]'>
                  {prevChatUsers.map((user,index)=>(
                      <div className='text-white cursor-pointer w-full flex items-center gap-[10px]' 
                      onClick={()=>{dispatch(setSelectedUser(user)) 
                      navigate("/messageArea")
                      }}>
                      {onlineUsers?.includes(user._id) ?<OnlineUser user={user}/>: <div className='w-[30px] h-[30px] border-2 border-black
                      rounded-full cursor-pointer overflow-hidden'> 
                      <img src={ user.profileImage || dp1} alt="" className='w-full object-cover'/>
                      </div>}
                      
                      <div className='flex flex-col gap-[10px]'>
                        <div className='text-white text-[18px] font-semibold'>{user.userName}</div>
                          {onlineUsers?.includes(user?._id)?  <div className='text-blue-400 text-[15px]'>Active Now</div> : <div>Offline</div>}
                        </div>
                  </div>
       ))}
       

                 </div>
        </div>
    );
}

export default Messages;