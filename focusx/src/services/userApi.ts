import axios from "axios";

const userApi = axios.create({
  baseURL: "https://user-service-focusx.up.railway.app/api",
  withCredentials: true,
});

userApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await userApi.post("/auth/refresh", null, {
          withCredentials: true,
        });

        return userApi(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default userApi;
