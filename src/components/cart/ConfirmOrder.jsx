import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOnlineOrder,
  createOrderAction,
  paymentVerificationAction,
} from "../../redux/actions/orderAction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const dispatch = useDispatch();
  const {
    shippingInfo,
    cartItems,
    paymentMethod,
    subTotal,
    tax,
    shippingCharges,
    total,
  } = useSelector((state) => state.cart);

  const { message, error } = useSelector((state) => state.order);

  const submitHandler = async (e) => {
    e.preventDefault();

    setDisableBtn(true);

    if (payment === "COD") {
      const orderPayload = {
        shippingInfo,
        cartItems,
        paymentMethod,
        subTotal,
        tax,
        shippingCharges,
        total,
      };
      const res = await dispatch(createOrderAction(orderPayload));
    } else {
      const orderOnlinePayload = {
        shippingInfo,
        orderItems: cartItems,
        paymentMethod,
        itemPrice: subTotal,
        taxPrice: tax,
        shippingCharges,
        totalAmount: total,
      };

      const orderRes = await dispatch(createOnlineOrder(orderOnlinePayload));
      const { order, orderOption } = orderRes;

      const options = {
        key: "rzp_test_tehPiPYj4wsRI4",
        amount: order.amount,
        currency: "INR",
        name: "THE CAKE SHOP",
        description: "Cake App",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const payload = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            orderOption,
          };
          await dispatch(paymentVerificationAction(payload));
        },
        theme: {
          color: "#f59e0b",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      dispatch({ type: "emptyState" });
      navigate("/paymentsuccess");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
      setDisableBtn(false);
    }
  }, [dispatch, message, error, navigate]);

  return (
    <section className="confirm-order">
      <main>
        <h1>Confirm Order</h1>

        <form onSubmit={submitHandler}>
          <div>
            <label>Cash on Delivery</label>
            <input
              type="radio"
              name="payment"
              onChange={() => setPayment("COD")}
              required
            />
          </div>
          <div>
            <label>Online</label>
            <input
              type="radio"
              name="payment"
              onChange={() => setPayment("online")}
            />
          </div>

          <button disabled={disableBtn} type="submit">
            Place Order
          </button>
        </form>
      </main>
    </section>
  );
};

export default ConfirmOrder;
