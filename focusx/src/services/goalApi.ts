import axios from "axios";

const goalApi = axios.create({
  baseURL: "http://localhost:8081/api/goals",
  withCredentials: true,
});

export default goalApi;
