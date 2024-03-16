import axios from "axios";

const BASE_URL = "192.168.1.19";
const TOKEN = "9S2yi7E4CwR3T4XnUu08";

export const userRequset = axios.create({
  baseURL: BASE_URL,
});
