import axios from "axios";
import {
  createOrderOnlineService,
  createOrderService,
  getMyOrdersService,
  getOrderDetailsService,
  paymentVerificationService,
} from "../services/order.service";

export const createOrderAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "createOrderRequest",
    });
    const res = await createOrderService(payload);
    if (res.status === 200) {
      dispatch({
        type: "createOrderSuccess",
        payload: res.message,
      });
      return res;
    }
  } catch (error) {
    const errorResponse = error?.data;
    dispatch({
      type: "createOrderFail",
      payload: errorResponse.errMsg,
    });
  }
};

export const createOnlineOrder = (payload) => async () => {
  try {
    const res = await createOrderOnlineService(payload);
    return res;
  } catch (error) {
    throw error;
  }
};

export const paymentVerificationAction = (payload) => async (dispatch) => {
  dispatch({
    type: "paymentVerificationRequest",
  });

  const res = await paymentVerificationService(payload);
  if (res?.success) {
    dispatch({
      type: "paymentVerificationSuccess",
      payload: res?.message,
    });
    return res;
  } else {
    dispatch({
      type: "paymentVerificationFail",
      payload: "Something went wrong.",
    });
  }
};

export const getMyOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: "getMyOrdersRequest" });
    const res = await getMyOrdersService();
    if (res?.success) {
      dispatch({ type: "getMyOrdersSuccess", payload: res?.orders });
    }
  } catch (error) {
    dispatch({ type: "getMyOrdersFail", payload: error.data.message });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getOrderDetailsRequest" });
    const res = await getOrderDetailsService(id);
    if (res?.success === true) {
      dispatch({ type: "getOrderDetailsSuccess", payload: res.order });
    }
  } catch (error) {
    dispatch({
      type: "getOrDetailsFail",
      payload: error.data.message,
    });
  }
};
