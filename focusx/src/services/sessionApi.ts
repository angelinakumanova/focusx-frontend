import axios from "axios";

const sessionApi = axios.create({
  baseURL: "http://localhost:8082/api/sessions",
  withCredentials: true,
});

export default sessionApi;
