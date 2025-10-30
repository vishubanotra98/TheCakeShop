import axios from "axios";

export const API = {
  AUTH: {
    IS_AUTHENTICATED: "/me",
    LOG_IN: "/login",
    SIGN_UP: "/register",
  },
  ORDERS: {
    GET_ORDERS: "/myorders",
    CREATE_ORDER: "/createorder",
    CREATE_ORDER_ONLINE: "/createorderonline",
    PAYMENT_VERIFICATION: "/paymentverification",
    ORDER_DETAILS: "/order",
  },
};

const token = localStorage.getItem("token");
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const axiosClient = axios.create();

axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axiosClient.defaults.headers.common["Content-type"] = "application/json";

axiosClient.interceptors.response.use(
  async (response) => {
    if (response.data) {
      return response;
    }
  },
  async (error) => {
    return error;
  }
);
