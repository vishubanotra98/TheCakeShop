import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer, oredrsReducer } from "./reducers/ordersReducer";
import { adminReducer } from "./reducers/adminReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    orders: oredrsReducer,
    admin: adminReducer,
  },
});

export default store;
