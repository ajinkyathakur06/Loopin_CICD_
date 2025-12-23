import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/axios.js";

import { serverUrl } from "../App.jsx";
import { setPostData } from "../redux/postSlice.js";

export default function useAllPost() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await api.get(
          `/api/post/getAll`,
          { withCredentials: true }
        );
        dispatch(
            setPostData(Array.isArray(result.data) ? result.data : [])
        );

      } catch (error) {
        console.error("getAllPost error:", error);
      }
    };

    fetchPost();
  }, [dispatch, userData]);
}
