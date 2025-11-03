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
  ADMIN: {
    FEEDBACK: "/admin/contact",
    USER_FEEDBACK: "/contact",
  },
};

export const BASE_URL = process.env.REACT_APP_BASE_URL || "";
export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

const tokenOnLoad = localStorage.getItem("token");
if (tokenOnLoad) setAuthToken(tokenOnLoad);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response);
    }
  }
);
