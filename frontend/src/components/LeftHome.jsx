// export default LeftHome;
import React from 'react';
// Importing React library

import logo1 from '../assets/logo1.png'
// Importing a logo image from assets

import { FaRegHeart } from "react-icons/fa";
// Importing heart icon (outlined heart) from react-icons library

import dp1 from '../assets/dp.jpg'
// Importing a default display picture (used if user has no profile image)

import { useSelector } from 'react-redux';
// Hook to access values from Redux store

import { useDispatch } from 'react-redux';
// Hook to dispatch actions to Redux store

import { setUserData } from '../redux/userSlice';
// Importing the action to set/reset user data from userSlice (Redux slice)

import api from '../utils/axios.js';
// For making API requests

import { serverUrl } from "../App.jsx";
// Importing backend server URL from App.jsx (to hit API routes)

import OtherUser from './OtherUser.jsx';
// Importing OtherUser component (to display suggested users)

function LeftHome() {

    // Getting userData and suggestedUsers state from Redux store (state.user)
    const {userData, suggestedUsers} = useSelector(state => state.user);

    // Creating a dispatch function to send actions to Redux store
    const dispatch = useDispatch();

    // Logout handler function
    const handleLogOut = async () => {
        try {
            // API call to backend to log out the user (clears session/cookies)
            const result = await api.get(`/api/auth/signout`, { withCredentials: true });
            
            // After successful logout, clear user data from Redux store
            dispatch(setUserData(null));
        } catch (error) {
            // If logout fails, print error in console
            console.log(error);
        }
    }

    return (
        <div className="w-[25%] hidden lg:block h-screen bg-black
 border-r-2 border-gray-900 overflow-y-auto ">
           
            
            <div className="w-full flex items-center justify-between p-[20px]">
                {/* Top section: logo + heart icon */}
                
                <img src={logo1} alt="" className='w-[150px]' />
                {/* App logo */}
                
                <div>
                    {/* Empty div (can be used later if needed) */}
                </div>  

                <FaRegHeart className='text-white w-[25px] h-[25px]'/>
                {/* Heart icon (white color, 25x25 size) */}
            </div>

            {/* Profile section */}
            <div className='flex items-center mt-[10px] w-full justify-between  gap-[10px] px-[10px]
                border-b-2 border-gray-900 pb-[10px]'>
                
                <div className='flex items-center gap-[10px]'>
                    {/* Profile image */}
                    <div className='w-[50px] h-[50px] border-2 border-black
                     rounded-full cursor-pointer overflow-hidden'> 
                        <img src={ userData.profileImage || dp1} alt="" className='w-full object-cover'/>
                        {/* Show user's profile image, else fallback to default dp */}
                    </div>
                    
                    <div>
                        {/* User info */}
                        <div className='text-[15px] text-white font-semibold'>{userData.userName}</div>
                        {/* Username (bold white text) */}
                        
                        <div className='text-[15px] text-gray-400 font-semibold'>{userData.name}</div>
                        {/* Full name (gray color) */}
                    </div>
                </div> 
                
                {/* Logout button */}
                <div 
                  className='text-blue-500 font-semibold cursor-pointer' 
                  onClick={handleLogOut}>
                  Log Out
                </div>     
            </div>

            {/* Suggested users section */}
            <div className='w-full flex flex-col'>
                <h1 className='text-[white] text-[15px]'>Suggested Users</h1>
                {/* Title for suggested users */}
                
                {Array.isArray(suggestedUsers) && suggestedUsers.slice(0, 3).map((user) => (
                    <OtherUser key={user._id} user={user} />
                ))}
            </div> 
        </div>
    );
}

export default LeftHome;
// Exporting the component so it can be used in other files
