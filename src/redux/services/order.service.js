import { API, axiosClient, BASE_URL } from "../../apiConstants";

export const createOrderService = async (payload) => {
  try {
    const res = await axiosClient.post(
      `${BASE_URL}${API.ORDERS.CREATE_ORDER}`,
      payload
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const createOrderOnlineService = async (payload) => {
  try {
    const res = await axiosClient.post(
      `${BASE_URL}${API.ORDERS.CREATE_ORDER_ONLINE}`,
      payload
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const paymentVerificationService = async (payload) => {
  try {
    const res = await axiosClient.post(
      `${BASE_URL}${API.ORDERS.PAYMENT_VERIFICATION}`,
      payload
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getMyOrdersService = async () => {
  try {
    const res = await axiosClient.get(`${BASE_URL}${API.ORDERS.GET_ORDERS}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderDetailsService = async (id) => {
  try {
    const res = await axiosClient.get(
      `${BASE_URL}${API.ORDERS.ORDER_DETAILS}/${id}`
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};
