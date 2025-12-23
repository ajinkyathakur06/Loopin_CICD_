import React, { use } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { serverUrl } from '../App.jsx';
import { toggleFollow,setFollowing } from '../redux/userSlice.js';
import api from '../utils/axios.js';
// Importing backend server URL from App.jsx (to hit API routes)

function FollowButton({targetUserId,tailwind,onFollowChange}  ) {
  const {following}=useSelector(state=>state.user)
  const isFollowing=following.includes(targetUserId)
  const dispatch=useDispatch()
  const handleFollow=async()=>{
    try{
      const result=await api.get(`/api/user/follow/${targetUserId}`,{withCredentials:true})
      if(onFollowChange){
        onFollowChange()
      }
      dispatch(toggleFollow(targetUserId))
      // dispatch(setFollowing(result.data.following))

    }catch(error){
      console.log(error)
    }

  }
    return (
        <button className={tailwind} onClick={handleFollow}>
          {isFollowing?"Following":"Follow"}
        </button>
    );
}

export default FollowButton;