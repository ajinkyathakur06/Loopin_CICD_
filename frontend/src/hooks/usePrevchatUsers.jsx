import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/axios.js";

import { serverUrl } from "../App.jsx";
import { setPrevChatUsers } from "../redux/messageSlice.js";

export default function usePrevChatUsers() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await api.get(
          `/api/message/prevChats`,
          { withCredentials: true }
        );

        dispatch(setPrevChatUsers(Array.isArray(result.data) ? result.data : []));
        console.log("Prev Chat Users:", result.data);
      } catch (error) {
        console.error("getPrevChatUsers error:", error);
      }
    };

    fetchUser();
  }, [dispatch, messages]);
}
