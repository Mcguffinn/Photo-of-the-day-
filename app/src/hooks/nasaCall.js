import axios from "axios";
import { makeUseAxios } from "axios-hooks";



export const api_key = process.env.REACT_APP_KEY;
export const axiosInstance = axios.create({
  baseURL: "https://api.nasa.gov",
  params: {
    api_key,
  },
});

const newInstance = axios.create({
  // new other api's defualt settings
});

export default makeUseAxios({ axios: axiosInstance, newInstance });
