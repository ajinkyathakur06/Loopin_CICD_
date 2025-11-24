import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import { useState } from "react"; 
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice.js";
import { setLoopData } from "../redux/loopSlice.js";
import { ClipLoader } from "react-spinners";


function Upload() {
  const navigate = useNavigate();
  const [uploadType,setUploadType ]= useState("post");
  const [frontendMedia,setFrontMedia]=useState(null); 
   const [backendMedia, setBackMedia] = useState(null);
   const [caption,setCaption]=useState("");
   const [mediaType,setMediaType]=useState(null);
   const mediaInput=React.useRef();
  const dispatch=useDispatch();
  const {postData}=useSelector(state=>state.post);
  const {loopData}=useSelector(state=>state.loop);
  const [loading,setLoading]=useState(false); 

   const handleMedia=(e)=>{
    const file=e.target.files[0];
    console.log(file);
    if(file.type.includes("image")){
      setMediaType("image")
    }else if(file.type.includes("video")){
        setMediaType("video")
    }else{
        alert("Please select a valid image or video file");
        return;
    }
    setBackMedia(file);
    setFrontMedia(URL.createObjectURL(file));
   }

const uploadPost=async()=>{
  try{
    
    if(!backendMedia){
        alert("Please select a file first!");
        return;
    }
    const formData=new FormData();
    formData.append("caption",caption);
    formData.append("mediaType",mediaType);
    formData.append("media",backendMedia);
    
    const result=await axios.post(`${serverUrl}/api/post/upload`,formData,{withCredentials:true})
    dispatch(setPostData([...postData,result.data]));
     alert("Post uploaded successfully!");
      setLoading(false);
      navigate("/");
  }catch(error){
    console.error("Upload post error: ",error.response?.data || error.message);
    alert("Upload failed! Check console for details.");
  }
}
const uploadLoop= async () => {
  try {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("media", backendMedia);

    const result = await axios.post(`${serverUrl}/api/loop/upload`, formData, {
      withCredentials: true})
       dispatch(setLoopData([result.data,...loopData]));
    // console.log("Loop upload success:", result);
    setLoading(false);
    navigate("/");
       alert("Loop uploaded successfully!");
  } catch (error) {
    console.error(` upload Loop Error: ${error}`);
      alert("Upload failed! Check console for details.");
  }
};

const handleUpload = async () => {
  setLoading(true);
  if (!backendMedia) {
    alert("Please select a file first!");
    return;
  }
  if (uploadType === "post") {
    await uploadPost();
  } else {
    await uploadLoop();
  }
};


  return (
    <div className="w-full h-[100vh] bg-black flex flex-col items-center">
          {/* Header */}
      <div className="w-full h-[80px] flex items-center gap-5 px-5">
        <IoArrowBackOutline
          className="text-white w-[25px] h-[25px] cursor-pointer"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white font-semibold text-[20px]">Upload Media</h1>
      </div>

   {/* Upload Type Selector */}
      <div
        className="w-[80%] max-w-[600px] h-[80px] bg-[white] rounded-full
         flex justify-around items-center gap-[10px]"
      >
        <div
          className={`${
            uploadType == "post"
              ? "bg-black shadow-2xl shadow-black text-white": ""} w-[28%] h-[80%] flex justify-center items-center text-[19px]
        font-semibold hover:bg-black rounded-full hover:text-white
        cursor-pointer hover:shadow-2xl hover:shadow-black`}
        onClick={() => setUploadType("post")}
        >
          Post
        </div>
        <div
          className={`${
            uploadType == "loop"
              ? "bg-black shadow-2xl shadow-black text-white"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px]
        font-semibold hover:bg-black rounded-full hover:text-white
        cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("loop")}
        >
          Loop
        </div>
      </div>
            {/* File Upload Box */}

     { !frontendMedia && 
     <div className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316]
      border-gray-800 border-2 flex flex-col items-center justify-center 
      gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]"
        onClick={() => mediaInput.current.click()}>
        <input type="file" hidden ref={mediaInput} onChange={handleMedia}/>
        <FaSquarePlus className="text-white w-[25px] h-[25px] cursor-pointer" />
        <div className="text-white text-[19px] font-semibold">
          Upload {uploadType}</div>
      </div>}

      {/* Preview & Caption */}

      {frontendMedia && <div className="w-[80%] max-w-[500px] h-[250px] 
      border-gray-800 border-2 flex flex-col items-center justify-center 
       mt-[15vh]">

        {mediaType=="image" && <div className="w-[80%] max-w-[500px] h-[250px] 
       flex flex-col items-center justify-center mt-[5vh]"> 
     
      <img src={frontendMedia} alt="" className=" h-[60%] rounded-2xl"/>

           {uploadType!="story" && <input type='text' className="w-full border-b-gray-400 
           border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]" 
           placeholder='Write a caption...' onChange={(e)=>setCaption(e.target.value)} value={caption}/>}
      </div>}

      {mediaType=="video" && <div className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316]
      border-gray-800 border-2 flex flex-col items-center justify-center 
      mt-[5vh]"> 
      <VideoPlayer media={frontendMedia}/>
      {uploadType!="story" &&
        <input type="text" className="w-full border-b-gray-400 border-b-2 
        outline-none px-[10px] py-[5px] text-white mt-[20px]"
         placeholder='Write a caption...' onChange={(e)=>setCaption(e.target.value)} value={caption}/> 
}
      </div>}
      </div>}
        {/* Upload Button */}
      {frontendMedia && <button className="px-[10px] w-[60%] max-w-[400px]
      py-[5px] h-[50px] bg-[white] mt-[50px] cursor-pointer rounded-2xl" onClick={handleUpload}>{loading?<ClipLoader size={30} color='black'/>:`Upload ${uploadType}`}</button>}

    </div>
  
  );
}

export default Upload;
