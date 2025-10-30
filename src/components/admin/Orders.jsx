import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineEye } from "react-icons/ai";
import { GiArmoredBoomerang } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders, processOrder } from "../../redux/actions/adminAction";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import "../../styles/orders.scss";

const Orders = () => {
  const dispatch = useDispatch();

  const { loading, orders, message, error } = useSelector(
    (state) => state.admin
  );

  const processOrderHandler = async (id) => {
    dispatch(processOrder(id));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    dispatch(getAdminOrders());
  }, [dispatch, message, error]);

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
        <td data-label="User" className="user-cell">
          {order.user.name}
        </td>
        <td data-label="Actions" className="action-cell">
          <div className="action-buttons">
            <Link
              to={`/order/${order._id}`}
              className="action-btn view-btn"
              title="View Order"
            >
              <AiOutlineEye />
            </Link>
            <button
              onClick={() => processOrderHandler(order._id)}
              className="action-btn process-btn"
              title="Process Order"
            >
              <GiArmoredBoomerang />
            </button>
          </div>
        </td>
      </motion.tr>
    );
  };

  return (
    <motion.section
      className="ordersClass"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main>
        <header className="orders-header">
          <h1>Orders Management</h1>
          <p className="subtitle">
            {orders?.length > 0
              ? `Managing ${orders.length} ${
                  orders.length === 1 ? "order" : "orders"
                }`
              : "No orders placed yet"}
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
              <h3>No orders found</h3>
              <p>There are no orders in the system yet.</p>
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
                    <th>User</th>
                    <th>Actions</th>
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

export default Orders;
