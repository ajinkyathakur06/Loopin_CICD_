import React from 'react';
import dp1 from '../assets/dp.jpg'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FollowButton from './FollowButton';

function OtherUser({user}) {
    
    const userData= useSelector(state=>state.user)
    const navigate=useNavigate();
    return (
                    <div className='flex items-center mt-[10px] w-full justify-between  gap-[10px] px-[10px]
                    border-b-2 border-gray-900 pb-[10px]'>
                        <div className='flex items-center gap-[10px]'>
                        <div className='w-[30px] h-[30px] border-2 border-black
                         rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${user.userName}`)}> 
                            <img src={ user.profileImage || dp1} alt="" className='w-full object-cover'/>
                        </div>
                        <div >
                            <div className='text-[15px] text-white font-semibold'>{user.userName}</div>
                            <div className='text-[15px] text-gray-400 font-semibold'>{user.name}</div>
                            
                        </div>
                        
                  </div>
                  <FollowButton tailwind='px-[10px] w-[100px] py-[5px] h-[40px] bg-white rounded-2xl' targetUserId={user._id}/>
      
                  </div>
    );
}

export default OtherUser;