import axios from "axios";
import {
  createOrderOnlineService,
  createOrderService,
  getMyOrdersService,
  getOrderDetailsService,
  paymentVerificationService,
} from "../services/order.service";

export const createOrderAction = (payload) => async (dispatch) => {
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
  } else {
    const errorResponse = res?.response.data;
    dispatch({
      type: "createOrderFail",
      payload: errorResponse.errMsg,
    });
  }
};

export const createOnlineOrder = (payload) => async () => {
  const res = await createOrderOnlineService(payload);
  return res;
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
  dispatch({ type: "getMyOrdersRequest" });
  const res = await getMyOrdersService();
  if (res?.data?.success === true) {
    dispatch({ type: "getMyOrdersSuccess", payload: res?.data?.orders });
  } else {
    dispatch({ type: "getMyOrdersFail", payload: res.response.data.message });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  dispatch({ type: "getOrderDetailsRequest" });
  const res = await getOrderDetailsService(id);
  if (res?.success === true) {
    dispatch({ type: "getOrderDetailsSuccess", payload: res.order });
  } else {
    dispatch({
      type: "getOrDetailsFail",
      payload: res.response.data.message,
    });
  }
};
