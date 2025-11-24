import {createSlice} from "@reduxjs/toolkit"
const loopSlice=createSlice({
    name:"loop",
    initialState:{
       loopData:[],
       
    },
reducers:{
    setLoopData:(state,action) =>{               //this will store the data otf the user when they wil signup
    state.loopData = action.payload
    }  
}
})
export const {setLoopData }=loopSlice.actions
export default loopSlice.reducer