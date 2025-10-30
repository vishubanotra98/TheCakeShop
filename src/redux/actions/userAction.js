import axios from "axios";
import {
  isAuthenticatedService,
  loginService,
  signupService,
} from "../services/auth.service";
import { swalErrorMessage } from "../../swalPopups/swalPopups";

export const isAuthenticatedAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const res = await isAuthenticatedService();

    dispatch({
      type: "loadUserSucess",
      payload: res.user,
    });
  } catch (error) {
    swalErrorMessage(error.response.data.message);
  }
};

export const loginAction = (payload) => async (dispatch) => {
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
  } else {
    dispatch({
      type: "loginRequestFail",
      payload: res.response.errMsg,
    });
  }
};

export const signupAction = (payload) => async (dispatch) => {
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
  } else {
    console.log("Running");
    const errResponse = res.response.data;
    dispatch({ type: "signupRequestFail", payload: errResponse?.errMsg });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    localStorage.removeItem("token");

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
