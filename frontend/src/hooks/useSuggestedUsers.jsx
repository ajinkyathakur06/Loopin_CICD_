import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/axios.js";

import { serverUrl } from "../App.jsx";
import { setSuggestedUsers } from "../redux/userSlice.js";

export default function useSuggestedUsers() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await api.get(
          `/api/user/suggested`,
          { withCredentials: true }
        );

        dispatch(setSuggestedUsers(Array.isArray(result.data) ? result.data : []));
      } catch (error) {
        console.error("useSuggestedUsers error:", error);
      }
    };

    fetchUser();
  }, [dispatch, userData]);
}
