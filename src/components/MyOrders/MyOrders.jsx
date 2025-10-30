import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrdersAction } from "../../redux/actions/orderAction";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import "../../styles/myoders.scss";

const MyOrders = () => {
  const { orders, loading, error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      if (error) {
        toast.error(error);
        dispatch({ type: "clearError" });
      }
      await dispatch(getMyOrdersAction());
    };
    init();
  }, []);

  const tableRow = (order, i) => {
    const totalQuantity =
      order.orderItems.cheeseCake.quantity +
      order.orderItems.blackForestCake.quantity +
      order.orderItems.pineAppleCake.quantity;

    return (
      <motion.tr
        layout
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28 }}
        key={order._id}
        className="data-row"
      >
        <td data-label="Order ID" className="order-id-cell">
          {order._id}
        </td>
        <td data-label="Status" className="status-cell">
          <span
            className={`status-badge ${order.orderStatus
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {order.orderStatus}
          </span>
        </td>
        <td data-label="Quantity" className="quantity-cell">
          {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
        </td>
        <td data-label="Amount" className="amount-cell">
          ₹{order.totalAmount.toLocaleString()}
        </td>
        <td data-label="Payment" className="payment-cell">
          {order.paymentMethod}
        </td>
        <td data-label="Action" className="action-cell">
          <Link
            to={`/order/${order._id}`}
            className="action-btn view-btn"
            title="View Order Details"
          >
            <AiOutlineEye />
            <span className="btn-text">View</span>
          </Link>
        </td>
      </motion.tr>
    );
  };

  return (
    <motion.section
      className="myOrdersClass"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main>
        <header className="myorders-header">
          <h1>My Orders</h1>
          <p className="subtitle">
            {orders?.length > 0
              ? `You have ${orders.length} ${
                  orders.length === 1 ? "order" : "orders"
                }`
              : "No orders yet"}
          </p>
        </header>

        <div className="table-wrap">
          {loading ? (
            <div className="loader-wrap">
              <Loader />
            </div>
          ) : !orders || orders.length === 0 ? (
            <div className="empty-state">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <h3>No orders yet</h3>
              <p>
                You haven't placed any orders. Start shopping to see your orders
                here!
              </p>
            </div>
          ) : (
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <AnimatePresence initial={false} mode="popLayout">
                  <tbody>{orders.map((order, i) => tableRow(order, i))}</tbody>
                </AnimatePresence>
              </table>
            </div>
          )}
        </div>
      </main>
    </motion.section>
  );
};

export default MyOrders;
