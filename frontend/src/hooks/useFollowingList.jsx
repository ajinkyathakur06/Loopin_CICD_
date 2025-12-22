import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { serverUrl } from "../App.jsx";
import { setFollowing } from "../redux/userSlice.js";

export default function useFollowingList() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/followingList`,
          { withCredentials: true }
        );
        dispatch(setFollowing(result.data));
      } catch (error) {
        console.error("getFollowingList error:", error);
      }
    };

    fetchUser();
  }, [dispatch]);
}
