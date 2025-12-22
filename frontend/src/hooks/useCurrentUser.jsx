import react from "react"
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData,setFollowing } from "../redux/userSlice";   
import { useEffect } from "react";
import axios from "axios";


export default function useCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [dispatch]);
}
