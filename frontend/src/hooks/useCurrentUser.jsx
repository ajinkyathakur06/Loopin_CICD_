import react from "react"
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData,setFollowing } from "../redux/userSlice";   
import { useEffect } from "react";
import api from "../utils/axios.js";


export default function useCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await api.get(
          `/api/user/current`,
          { withCredentials: true }
        );
        dispatch(setUserData(Array.isArray(result.data) ? result.data : []));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [dispatch]);
}
