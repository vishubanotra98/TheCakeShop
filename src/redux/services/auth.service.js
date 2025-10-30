import { API, axiosClient, BASE_URL } from "../../apiConstants";

export const isAuthenticatedService = async () => {
  try {
    const res = await axiosClient.get(
      `${BASE_URL}${API.AUTH.IS_AUTHENTICATED}`
    );
    return res.data;
  } catch (error) {
    return error;
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
    return error;
  }
};

export const loginService = async (payload) => {
  try {
    const res = await axiosClient.post(
      `${BASE_URL}${API.AUTH.LOG_IN}`,
      payload
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
