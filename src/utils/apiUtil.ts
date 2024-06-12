import { NoiseAware } from "@mui/icons-material";
import axios from "axios";

const api = axios.create({
  baseURL: "",
});

api.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
  };
  return config;
});

const apiReport = axios.create({
  baseURL: "http://192.168.1.46:9999/",
  //baseURL: "https://localhost:44308/",
});

export default { apiReport, api };

