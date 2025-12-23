
import React, { useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dp1 from "../assets/dp1.jpg";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";
import api from "../utils/axios.js";
import { serverUrl } from "../App.jsx";

function EditProfile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false)

  const imageInput = useRef(null);
  const [frontendImage, setFrontendImage] = useState(
    userData?.profileImage || dp1
  );
  const [backendImage, setBackendImage] = useState(null);
  const [name, setName] = useState(userData.name || "");
  const [userName, setUserName] = useState(userData.userName || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profession, setProfession] = useState(userData.profession || "");
  const [gender, setGender] = useState(userData.gender || "");

  // Handle file change
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleEditProfile = async () => {
 setLoading(true)
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("userName", userName);
      formdata.append("bio", bio);
      formdata.append("profession", profession);
      formdata.append("gender", gender);
      if(backendImage){
        formdata.append("profileImage",backendImage)
      }
      const result = await api.post(`/api/user/editProfile`,formdata,{withCredentials:true});
      dispatch(setProfileData(result.data))
      dispatch(setUserData(result.data))
      setLoading(false)
      navigate(`/profile/${userData.userName}`)
    } catch (error) {
      setLoading(false)
        console.log(error);
        
        

    }
  };
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center">
      {/* Header */}
      <div className="w-full h-[80px] flex items-center gap-5 px-5">
        <IoArrowBackOutline
          className="text-white w-[25px] h-[25px] cursor-pointer"
          onClick={() => navigate(`/profile/${userData.userName}`)}
        />
        <h1 className="text-white font-semibold text-[20px]">Edit Profile</h1>
      </div>

      {/* Content wrapper */}
      <div className="flex-1 w-full flex flex-col items-center justify-center lg:justify-start lg:mt-6 gap-5">
        {/* Profile image */}
        <div
          className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
          onClick={() => imageInput.current.click()}
        >
          <img
            src={frontendImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          className="hidden"
          onChange={handleImage}
        />

        <div
          className="text-blue-500 text-center text-[16px] font-semibold cursor-pointer"
          onClick={() => imageInput.current.click()}
        >
          Change Your Profile Picture
        </div>

        {/* Inputs */}
        <div className="w-full flex flex-col items-center gap-3">
          <input
            type="text"
            className="w-[85%] max-w-[600px] h-[40px] bg-[#0a1010] border border-gray-700 rounded-2xl px-4 outline-none text-white font-semibold"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            className="w-[85%] max-w-[600px] h-[40px] bg-[#0a1010] border border-gray-700 rounded-2xl px-4 outline-none text-white font-semibold"
            placeholder="Enter Your UserName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="text"
            className="w-[85%] max-w-[600px] h-[40px] bg-[#0a1010] border border-gray-700 rounded-2xl px-4 outline-none text-white font-semibold"
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
          <input
            type="text"
            className="w-[85%] max-w-[600px] h-[40px] bg-[#0a1010] border border-gray-700 rounded-2xl px-4 outline-none text-white font-semibold"
            placeholder="Profession"
            onChange={(e) => setProfession(e.target.value)}
            value={profession}
          />
          <input
            type="text"
            className="w-[85%] max-w-[600px] h-[40px] bg-[#0a1010] border border-gray-700 rounded-2xl px-4 outline-none text-white font-semibold"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          />

          {/* Button */}
          <button className="w-[70%] max-w-[400px]
           h-[50px] bg-white cursor-pointer rounded-2xl font-semibold text-[18px] mt-2"
           onClick={handleEditProfile} >{loading?<ClipLoader size={30} color='black'/>:"Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
