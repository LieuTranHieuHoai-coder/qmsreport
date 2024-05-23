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
  baseURL: "http://qmsrp.qve.com.vn/",
});

export default { apiReport, api };

