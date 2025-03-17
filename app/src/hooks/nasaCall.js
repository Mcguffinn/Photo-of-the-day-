import axios from "axios";
import { makeUseAxios } from "axios-hooks";

// Use the environment variable API key or fallback to DEMO_KEY if not available
export const api_key = process.env.REACT_APP_KEY || "DEMO_KEY";

// Log whether we're using the environment variable or the fallback
console.log(`Using NASA API key: ${api_key === "DEMO_KEY" ? "DEMO_KEY (limited requests)" : "Custom API key"}`);

export const axiosInstance = axios.create({
  baseURL: "https://api.nasa.gov",
  params: {
    api_key,
  },
});

// Add some error handling to help diagnose API issues
axiosInstance.interceptors.response.use(
  response => {
    console.log("NASA API Response:", response.data);
    return response;
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("NASA API Error:", error.response.status, error.response.data);
      if (error.response.status === 403) {
        console.error("Authentication failed. Please check your NASA API key in .env file.");
      } else if (error.response.status === 429) {
        console.error("Rate limit exceeded. The DEMO_KEY has a limited number of requests per hour.");
      }
    }
    return Promise.reject(error);
  }
);

// No need for separate newInstance in modern versions of axios-hooks
// as it automatically handles configuration options

export default makeUseAxios({ 
  axios: axiosInstance,
  // Modern axios-hooks options:
  defaultOptions: {
    ssr: false,
    useCache: true,
  }
});
