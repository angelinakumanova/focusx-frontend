import axios from "axios";

const userApi = axios.create({
  baseURL: "https://user-service-focusx.up.railway.app/api",
  withCredentials: true,
});

userApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isRefreshEndpoint = originalRequest.url?.includes("/auth/refresh");
    const isAuthEndpoint = originalRequest.url?.includes("/auth/login") || originalRequest.url?.includes("/auth/register");
    if (
      error.response?.status === 403 ||
      (error.response?.status === 401 && !originalRequest._retry && !isRefreshEndpoint && !isAuthEndpoint)
    ) {
      originalRequest._retry = true;

      try {
        await userApi.post("/auth/refresh", null, {
          withCredentials: true,
        });

        return userApi(originalRequest);
      } catch (refreshError) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default userApi;
