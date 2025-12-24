import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/forgotpassword.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Upload from "./pages/Upload.jsx";
import Messages from "./pages/Messages.jsx";
import MessageArea from "./pages/MessageArea.jsx";

import useCurrentUser from "./hooks/useCurrentUser.jsx";
import useSuggestedUsers from "./hooks/useSuggestedUsers.jsx";
import useAllPost from "./hooks/useAllPost.jsx";
import useFollowingList from "./hooks/useFollowingList.jsx";
import usePrevChatUsers from "./hooks/usePrevchatUsers.jsx";

import { setOnlineUsers, setSocket } from "./redux/socketSlice.js";

// ✅ Backend URL
// export const serverUrl = "http://localhost:5000"; 
//export const serverUrl = "https://loopin.imcc.com";
//export const serverUrl = import.meta.env.VITE_API_URL;


function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);

  // ✅ Load initial data
  useCurrentUser();
  useSuggestedUsers();
  useAllPost();
  useFollowingList();
  usePrevChatUsers();


  // ✅ Socket connection
  useEffect(() => {
    if (!userData?._id ||socket) return; // 🔥 CRITICAL GUARD

    const socketIo = io(import.meta.env.VITE_API_URL, {
      path: "/api/socket.io",
      withCredentials: true,
      query: { userId: userData._id },
      transports: ["websocket"],
    });

    dispatch(setSocket(socketIo));

    socketIo.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => socketIo.disconnect();
  }, [userData?._id]); // 🔥 depend ONLY on _id



  return (

      <Routes>
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/forgotpassword" element={!userData ? <ForgotPassword /> : <Navigate to="/" />} />

        <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/profile/:userName" element={userData ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/editprofile" element={userData ? <EditProfile /> : <Navigate to="/signin" />} />
        <Route path="/upload" element={userData ? <Upload /> : <Navigate to="/signin" />} />
        <Route path="/messages" element={userData ? <Messages /> : <Navigate to="/signin" />} />
        <Route path="/messageArea" element={userData ? <MessageArea /> : <Navigate to="/signin" />} />
      </Routes>

  );
}

export default App;