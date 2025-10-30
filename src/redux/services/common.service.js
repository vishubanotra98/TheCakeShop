import { API, axiosClient, BASE_URL } from "../../apiConstants";

export const fetchMessagesService = async () => {
  try {
    const response = await axiosClient.get(`${BASE_URL}${API.ADMIN.FEEDBACK}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const userFeedBackService = async (payload) => {
  try {
    const response = await axiosClient.post(
      `${BASE_URL}${API.ADMIN.USER_FEEDBACK}`,
      payload
    );
    return response;
  } catch (err) {
    throw err;
  }
};
