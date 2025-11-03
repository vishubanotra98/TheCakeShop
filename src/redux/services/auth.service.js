import { API, axiosClient, BASE_URL } from "../../apiConstants";

export const isAuthenticatedService = async () => {
  try {
    const res = await axiosClient.get(
      `${BASE_URL}${API.AUTH.IS_AUTHENTICATED}`
    );
    return res?.data;
  } catch (err) {
    throw err;
  }
};

export const signupService = async (payload) => {
  try {
    const res = await axiosClient.post(
      `${BASE_URL}${API.AUTH.SIGN_UP}`,
      payload
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (payload) => {
  try {
    const res = await axiosClient.post(`${API.AUTH.LOG_IN}`, payload);
    const token = res?.token;
    if (res?.status === 200) {
      localStorage.setItem("token", token);
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};
