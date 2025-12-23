import axios from "axios";
import { serverUrl } from "../App.jsx";

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

/* 🔥 RESPONSE SAFETY NET */
api.interceptors.response.use(
  (res) => {
    if (
      typeof res.data === "string" &&
      res.data.includes("<!DOCTYPE html>")
    ) {
      throw new Error("HTML response instead of JSON (Ingress/Auth issue)");
    }
    return res;
  },
  (err) => Promise.reject(err)
);

export default api;
