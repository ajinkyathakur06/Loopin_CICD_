import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { serverUrl } from "../App.jsx";
import { setSuggestedUsers } from "../redux/userSlice.js";

export default function useSuggestedUsers() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/suggested`,
          { withCredentials: true }
        );

        dispatch(setSuggestedUsers(result.data));
      } catch (error) {
        console.error("useSuggestedUsers error:", error);
      }
    };

    fetchUser();
  }, [dispatch, userData]);
}
