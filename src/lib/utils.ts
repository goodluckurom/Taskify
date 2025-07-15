import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api_base_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
console.log(api_base_url);

const api = axios.create({
  baseURL: api_base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
        // console.log("Request headers:", config.headers);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to log responses and errors
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.log("API Error:", {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message,
      fullError: error,
    });
    return Promise.reject(error);
  }
);

export { api };
