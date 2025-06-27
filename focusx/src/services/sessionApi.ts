import axios from "axios";

const sessionApi = axios.create({
  // baseURL: "https://session-service-focusx.up.railway.app/api/sessions",
  baseURL: "http://localhost:8082/api/sessions",
  withCredentials: true,
});

export default sessionApi;
