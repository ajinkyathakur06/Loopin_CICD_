import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/forgotpassword.jsx";
import Home from "./pages/Home.jsx";
import getCurrentUser from "./hooks/getCurrentUser.jsx";
import { useDispatch, useSelector } from "react-redux";
import getSuggestedUsers from "./hooks/getSuggestedUsers.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Upload from "./pages/Upload.jsx";
import getAllPost from "./hooks/getAllPost.jsx";
import Messages from "./pages/Messages.jsx";
import MessageArea from "./pages/MessageArea.jsx";
import { useEffect } from "react";
import {io} from "socket.io-client"
import { setOnlineUsers, setSocket } from "./redux/socketSlice.js";
import getFollowingList from "./hooks/getFollowingList.jsx";
import getPrevChatUsers from "./hooks/getPrevchatUsers.jsx";


export const serverUrl="https://loopin.imcc-projects.in"
function App() {
  getCurrentUser();
  getSuggestedUsers();
  getAllPost();
  getFollowingList();
  getPrevChatUsers();
  // getAllLoops();
  const {userData}=useSelector(state=>state.user)
    const {socket}=useSelector(state=>state.socket)
    const dispatch=useDispatch();
  useEffect(()=>{
    if(userData){
      const socketIo=io(`${serverUrl}`,{
        query:{
          userId:userData._id
        }
      })
      dispatch(setSocket(socketIo))
      socketIo.on('getOnlineUsers',(users)=>{
        dispatch(setOnlineUsers(users))
        console.log("Online Users:",users);
      })
      return ()=>socketIo.close()

    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
     
      }
    }
  },[userData])
 
  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/forgotpassword"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/profile/:userName"
        element={userData ? <Profile /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/editprofile"
        element={userData ? <EditProfile /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/upload"
        element={userData ? <Upload /> : <Navigate to={"/signin"} />}
      />
      {/* <Route
        path="/loops"
        element={userData ? <Loops /> : <Navigate to={"/signin"} />}
      /> */}
      <Route
        path="/messages"
        element={userData ? <Messages/> : <Navigate to={"/signin"} />}
      />
       <Route
        path="/messageArea"
        element={userData ? <MessageArea/> : <Navigate to={"/signin"} />}
      />
      


    </Routes>
    
  );
}
export default App;

