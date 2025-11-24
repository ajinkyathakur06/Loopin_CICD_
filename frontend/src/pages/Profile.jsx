import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { IoArrowBackOutline } from "react-icons/io5";
import dp1 from "../assets/dp.jpg";
import Nav from "../components/Nav.jsx";
import FollowButton from "../components/FollowButton.jsx";
import Post from "../components/Post.jsx";
import { useState } from "react";
import { setSelectedUser } from "../redux/messageSlice.js";



function Profile() {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { profileData,userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);
  const [postType,setPostType]=useState("posts")

  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
    } catch (error) {
      console.log(error);
    }
  };
  // Logout handler function
  const handleLogOut = async () => {
    try {
      // API call to backend to log out the user (clears session/cookies)
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });

      // After successful logout, clear user data from Redux store
      dispatch(setUserData(null));
      dispatch(setProfileData(null));

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      // If logout fails, print error in console
      console.log(error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName, dispatch]);
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-full h-[80px] flex justify-between items-center px-[30px] text-white gap-[20px]">
        <div onClick={()=>navigate("/")}>
          <IoArrowBackOutline className="text-white w-[25px] h-[25px] cursor-pointer" />
        </div>
        <div className="font-semibold text-[20px]">
          {" "}
          {profileData?.userName || "Loading..."}
        </div>
        <div
          className="font-semibold text-[15px] cursor-pointer text-blue-500"
          onClick={handleLogOut}
        >
          Log Out
        </div>
      </div>

      {/* Profile info section */}
      <div
        className="w-full h-[150px] flex items-start gap-[29px]
   lg:gap[50px] pt[10px] px-[10px] justify-center"
      >
        
        {/* Profile image */}
        <div
          className="w-[50px] h-[50px] border-2 border-black
        rounded-full cursor-pointer overflow-hidden"
        >
          <img
            src={profileData?.profileImage || dp1}
            alt=""
            className="w-full object-cover"
          />
          {/* Show user's profile image, else fallback to default dp */}
        </div>
        <div className="">
          <div className="font-semibold text[22px] text-white">
            {profileData?.name}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">
            {profileData?.profession || "New User"}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">{profileData?.bio}</div>
        </div>
      </div>

      {/* followers and following section */}
      <div className="w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white">
        {/* post section */}
        <div className="flex flex-col items-center">
          <div className="text-white text-[25px] md:text-[30px] font-semibold">
            {profileData?.posts.length}
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Posts
          </div>
        </div>

        {/* followers section */}
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            {/* stacked profile images */}
            <div className="flex relative">

              {profileData?.followers?.slice(0,3).map((user,index)=>
              (
              <div className={`w-[35px] h-[35px] border-2 border-black rounded-full 
              cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index*9}px]` : ""}`}>
                <img
                  src={user.profileImage || dp1}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              ))}    
            </div>

            {/* count */}
            <div className="text-white text-[25px] md:text-[30px] font-semibold">
              {profileData?.followers.length}
            </div>
          </div>

          {/* label */}
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Followers
          </div>
        </div>

        {/* following section */}
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            {/* stacked profile images */}
             <div className="flex relative">
             {profileData?.following?.slice(0,3).map((user,index)=>
              (
              <div className={`w-[35px] h-[35px] border-2 border-black rounded-full cursor-pointer overflow-hidden
               ${ index > 0 ? `absolute left-[${index*9}px]` : ""}`}>
                <img
                  src={user.profileImage || dp1}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              ))} 
            </div>

            {/* count */}
            <div className="text-white text-[25px] md:text-[30px] font-semibold">
              {profileData?.following.length}
            </div>
          </div>

          {/* label */}
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Following
          </div>
        </div>
      </div>

      {/* User's posts section */}
      <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]">
        {profileData?._id === userData?._id && (
          <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl" onClick={()=>navigate("/editprofile")}>
            Edit Profile
          </button>
        )}
        {profileData?._id !== userData?._id && (
          <>
          <FollowButton tailwind={"px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[#ffffffe8] text-black cursor-pointer rounded-2xl"}
          targetUserId={profileData?._id} onFollowChange=
          {handleProfile}/>
            <button className="px-[10px] min-w-[150px] py-[5px] 
            h-[40px] bg-[#ffffffe8] text-black cursor-pointer
             rounded-2xl"onClick={()=>{dispatch(setSelectedUser(profileData))
              navigate("/messageArea")}}>
              Message
            </button>
          </>
        )}
      </div>

      <div className="w-full min-h-[100vh] flex justify-center">
<div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[100px]">

{profileData?._id==userData._id && <div
        className="w-[80%] max-w-[600px] h-[80px] bg-[white] rounded-full
         flex justify-around items-center gap-[10px]"
      >
        <div
          className={`${
            postType == "posts"
              ? "bg-black shadow-2xl shadow-black text-white": ""} w-[28%] h-[80%] flex justify-center items-center text-[19px]
        font-semibold hover:bg-black rounded-full hover:text-white
        cursor-pointer hover:shadow-2xl hover:shadow-black`}
        onClick={() => setPostType("posts")}
        >
          Posts
        </div>
        <div
          className={`${
            postType == "saved"
              ? "bg-black shadow-2xl shadow-black text-white"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px]
        font-semibold hover:bg-black rounded-full hover:text-white
        cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setPostType("saved")}
        >
          Saved
        </div>
      </div>} 
  
      <Nav/>
{profileData?._id==userData._id && <>
{postType=="posts" && postData.map((post,index)=>(
  post.author?._id===profileData?._id && <Post post={post} key={post._id || index}/>
))}
{postType=="saved" && postData.map((post,index)=>(
  userData.saved.includes(post._id) && <Post post={post}/>
))}

</>
}
{profileData?._id!==userData._id && 
 postData.map((post,index)=>(
  post.author?._id===profileData?._id && <Post post={post} key={post._id || index}/>
))}

</div>
      </div>
    </div>
  );
}
export default Profile;
