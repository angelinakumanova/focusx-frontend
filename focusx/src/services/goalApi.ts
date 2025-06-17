import axios from "axios";

const goalApi = axios.create({
  baseURL: "https://goal-service.onrender.com/api/goals",
  withCredentials: true,
});

export default goalApi;
