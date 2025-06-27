import axios from "axios";

const goalApi = axios.create({
  // baseURL: "https://goal-service-focusx.up.railway.app/api/goals",
  baseURL: "http://localhost:8081/api/goals",
  withCredentials: true,
});

export default goalApi;
