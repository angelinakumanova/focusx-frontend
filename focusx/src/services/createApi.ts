import axios from "axios";
import { BASE_URLS } from "./baseUrls";

const refreshURL = BASE_URLS.user + "/auth/refresh";

export const createApi = (baseURL: string) => {
  const accessToken = localStorage.getItem("access_token");

  const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Authorization: accessToken ? "Bearer " + accessToken : null
    }
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const isRefreshEndpoint = originalRequest.url?.includes("/auth/refresh");
      const isAuthEndpoint =
        originalRequest.url?.includes("/auth/login") ||
        originalRequest.url?.includes("/auth/register");
      if (
        error.response?.status === 403 ||
        (error.response?.status === 401 &&
          !originalRequest._retry &&
          !isRefreshEndpoint &&
          !isAuthEndpoint)
      ) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(refreshURL, null, {
            withCredentials: true,
          });

          const newToken = response.data.access_token;
          localStorage.setItem("access_token", newToken);
          

          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
