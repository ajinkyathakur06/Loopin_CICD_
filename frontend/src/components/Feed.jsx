import React from 'react';
import logo1 from '../assets/logo1.png';
import { FaRegHeart } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import Nav from './Nav.jsx';
import Post from './Post.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Feed() {
  const { postData } = useSelector(state => state.post);
  const navigate=useNavigate();

  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative">
      {/* ✅ Scrollable section now includes header + posts */}
      <div className="w-full h-[100vh] overflow-y-auto">
        
        {/* Mobile header (only on small screens) */}
        <div className="w-full h-[100px] flex items-center justify-between p-[20px] 
                        lg:hidden sticky top-0 left-0 z-[20] bg-black">
          <img src={logo1} alt="Logo" className="w-[80px]" />
          <div className="flex gap-4 text-white">
            <FaRegHeart className="w-[25px] h-[25px]" />
            <LuMessageSquareText className="w-[25px] h-[25px]" onClick={()=>navigate("/messages")}/>
          </div>
        </div>

        {/* Main feed */}
        <div className="w-full min-h-[100vh] flex flex-col 
                        items-center gap-[20px] p-[10px] pt-[20px] bg-white 
                        relative pb-[120px]">
          <Nav />
          {Array.isArray(postData) && postData.length === 0 && (
            <div className="text-gray-500 mt-10">
              No posts available
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
export default Feed;




