


import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    selectedUser: null,
    messages: [],
    prevChatUsers: []
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    // Overwrite the full message list
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    // Add a single new message (used for real-time)
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    setPrevChatUsers: (state, action) => {
      state.prevChatUsers = action.payload;
    }
  }
});

export const { setSelectedUser, setMessages, addMessage, setPrevChatUsers } =
  messageSlice.actions;

export default messageSlice.reducer;
