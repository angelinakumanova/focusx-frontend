import axios from "axios";

const sessionApi = axios.create({
  baseURL: "https://session-service-focusx.up.railway.app/api/sessions",
  withCredentials: true,
});

export default sessionApi;
