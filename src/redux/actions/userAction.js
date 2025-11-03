import {
  isAuthenticatedService,
  loginService,
  signupService,
} from "../services/auth.service";
import {
  fetchMessagesService,
  userFeedBackService,
} from "../services/common.service";

export const isAuthenticatedAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const res = await isAuthenticatedService();
    if (res?.status === 200) {
      dispatch({
        type: "loadUserSucess",
        payload: res?.user,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: "loadUserFail",
      payload: error?.data?.message || "User Not Found.",
    });
  }
};

export const loginAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const res = await loginService(payload);
    if (res?.status === 200) {
      const token = res?.token;
      localStorage.setItem("token", token);
      dispatch({
        type: "loginRequestSucess",
        payload: res.message,
      });
      return res;
    }
  } catch (error) {
    dispatch({
      type: "loginRequestFail",
      payload: error.data.errMsg,
    });
  }
};

export const signupAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "signupRequest",
    });
    const res = await signupService(payload);
    if (res?.status === 200) {
      dispatch({
        type: "signupRequestSuccess",
        payload: res.message,
      });
      return res;
    }
  } catch (error) {
    const errResponse = error.data.errMsg;
    dispatch({ type: "signupRequestFail", payload: errResponse });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("cartItem");
    localStorage.removeItem("cartPrices");
    localStorage.removeItem("shippingInfo");
    dispatch({
      type: "logoutSucess",
      payload: "Logged out Successfully",
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: "Logout Failed",
    });
  }
};

export const fetchMessagesAction = () => async () => {
  const res = await fetchMessagesService();
  return res?.data;
};

export const userFeedBackAction = (payload) => async (dispatch) => {
  const res = await userFeedBackService(payload);
  return res?.data;
};
