import axios from "axios";

const sessionApi = axios.create({
  baseURL: "https://session-service-6gnf.onrender.com/api/sessions",
  withCredentials: true,
});

export default sessionApi;
