
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoArrowBackOutline, IoSend } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import dp1 from '../assets/dp1.jpg';
import axios from 'axios';
import { serverUrl } from "../App.jsx";

import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';
import { setMessages, addMessage } from '../redux/messageSlice';

function MessageArea() {

  const { userData } = useSelector(state => state.user);
  const { socket } = useSelector(state => state.socket);
  const { selectedUser, messages } = useSelector(state => state.message);

  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const imageInput = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 📌 Handle selecting an image
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file)); // Preview
  };

  // 📌 Send message (text or image)
  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("message", input);
      if (backendImage) formData.append("image", backendImage);

      const result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(addMessage(result.data)); // ✅ Add only new message
      setInput("");
      setBackendImage(null);
      setFrontendImage(null);

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // 📌 Get old messages
  const getAllMessages = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/message/getAll/${selectedUser._id}`,
        { withCredentials: true }
      );

      dispatch(setMessages(result.data)); // Overwrite list at start
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  // 📌 REAL-TIME LISTENER — runs once only
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (mess) => {
      dispatch(addMessage(mess));
    });

    return () => socket.off("newMessage");
  }, [socket]);

  return (
    <div className='w-fill h-[100vh] bg-black relative'>
      
      {/* 🔝 TOP BAR */}
      <div className='flex items-center gap-[15px] px-[20px] py-[10px] 
          fixed top-0 z-[100] bg-black w-full'>
        <div className="h-[80px] flex items-center gap-5 px-5">
          <IoArrowBackOutline
            className="text-white w-[25px] h-[25px] cursor-pointer"
            onClick={() => navigate(`/`)}
          />
        </div>

        <div 
          className='w-[50px] h-[50px] border-2 border-black rounded-full 
          cursor-pointer overflow-hidden'
          onClick={() => navigate(`/profile/${selectedUser.userName}`)}
        >
          <img src={selectedUser.profileImage || dp1} className='w-full object-cover' />
        </div>

        <div>
          <div className='text-[14px] text-white'>{selectedUser.userName}</div>
          <div className='text-gray-400'>{selectedUser.name}</div>
        </div>
      </div>

      {/* 💬 MESSAGE LIST */}
      <div className='w-full h-[80%] pt-[100px] pb-[80px] px-[40px] 
           flex flex-col gap-[50px] overflow-auto bg-black'>
        
        {messages && messages.map((mess, index) => (
          mess.sender === userData._id ?
            <SenderMessage key={index} message={mess} /> :
            <ReceiverMessage key={index} message={mess} />
        ))}
      </div>

      {/* ✏️ INPUT AREA */}
      <div className='w-full h-[80px] fixed bottom-0 flex justify-center items-center bg-black z-[100]'>

        <form className='w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#131616]
                        flex items-center gap-[10px] px-[20px] relative'
            onSubmit={handleSendMessage}>

          {frontendImage && (
            <div className='w-[100px] h-[100px] rounded-2xl absolute top-[120px] right-[10px] bg-white overflow-hidden'>
              <img src={frontendImage} className='h-full object-cover' />
            </div>
          )}

          <input type='file' accept='image/*' hidden ref={imageInput} onChange={handleImage} />

          <input
            type="text"
            placeholder='Message'
            className='w-full h-full px-[20px] text-[18px] text-white outline-0'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div onClick={() => imageInput.current.click()}>
            <FaRegImage className='w-[25px] h-[25px] text-white' />
          </div>

          {(input || frontendImage) && (
            <button className='w-[60px] h-[40px] rounded-full bg-gradient-to-br
                               from-[#9500ff] to-[#39F3F3] flex items-center justify-center'>
              <IoSend className='w-[20px] h-[20px] text-white' />
            </button>
          )}

        </form>
      </div>

    </div>
  );
}

export default MessageArea;
