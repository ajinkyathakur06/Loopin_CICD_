import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axios.js";

import { serverUrl } from "../App.jsx";
import { setFollowing } from "../redux/userSlice.js";

export default function useFollowingList() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await api.get(
          `/api/user/followingList`,
          { withCredentials: true }
        );
        dispatch(setFollowing(Array.isArray(result.data) ? result.data : []));
      } catch (error) {
        console.error("getFollowingList error:", error);
      }
    };

    fetchUser();
  }, [dispatch]);
}
