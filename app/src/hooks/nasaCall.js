import axios from "axios";
import { makeUseAxios } from "axios-hooks";

export const api_key = "EO0h1b6xsNy1K10ItVFw6jS5f2XY8SDfPyXaWKoD";
export const axiosCall = axios.create({
    baseURL: "https://api.nasa.gov",
    params: {
      api_key,
    },
})

export default makeUseAxios({axios: axiosCall});