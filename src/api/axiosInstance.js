import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:7000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axiosInstance.get("/api/user/refresh");

        localStorage.setItem("token", data.accessToken);

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Session expired. Please login again.", refreshError);
        localStorage.removeItem("token");

        return Promise.reject(refreshError);
      }
    } else if (error.response && error.response.status === 500) {
      console.log("Internal Server Error");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
