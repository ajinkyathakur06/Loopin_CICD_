import {createSlice} from "@reduxjs/toolkit"
const socketSlice=createSlice({
    name:"socket",
    initialState:{
       socket:null,
       onlineUsers:null
       
    },
reducers:{
    setSocket:(state,action) =>{               //this will store the data of the user when they will signup
    state.socket = action.payload
    } ,
    
    setOnlineUsers:(state,action) =>{           
    state.onlineUsers = action.payload
    } 
}
})
export const { setSocket, setOnlineUsers}=socketSlice.actions
export default socketSlice.reducer