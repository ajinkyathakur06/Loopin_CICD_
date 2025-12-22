import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { serverUrl } from "../App.jsx";
import { setPostData } from "../redux/postSlice.js";

export default function useAllPost() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/post/getAll`,
          { withCredentials: true }
        );
        dispatch(setPostData(result.data));
      } catch (error) {
        console.error("getAllPost error:", error);
      }
    };

    fetchPost();
  }, [dispatch, userData]);
}
