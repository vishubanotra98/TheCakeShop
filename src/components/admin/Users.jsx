import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers } from "../../redux/actions/adminAction";
import me from "../../assets/founder.png";
import Loader from "../layout/Loader";

const Users = () => {
  const dispatch = useDispatch();
  const { loading, users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminUsers());
  }, [dispatch]);

  const tableRow = (user, i) => {
    return (
      <motion.tr
        layout
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28 }}
        key={user._id}
        className="data-row"
      >
        <td data-label="User ID" className="user-id-cell">
          {user._id}
        </td>
        <td data-label="Name" className="name-cell">
          {user.name || "—"}
        </td>
        <td data-label="Photo" className="photo-cell">
          <img src={me} alt={user.name} />
        </td>
        <td data-label="Role" className="role-cell">
          <span className={`role-badge ${user.role?.toLowerCase()}`}>
            {user.role || "—"}
          </span>
        </td>
        <td data-label="Since" className="date-cell">
          {user.createdAt ? user.createdAt.split("T")[0] : "—"}
        </td>
      </motion.tr>
    );
  };

  return (
    <motion.section
      className="usersClass"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main>
        <header className="users-header">
          <h1>Users Management</h1>
          <p className="subtitle">
            {users?.length > 0
              ? `Showing ${users.length} registered ${
                  users.length === 1 ? "user" : "users"
                }`
              : "No users registered yet"}
          </p>
        </header>

        <div className="table-wrap">
          {loading ? (
            <div className="loader-wrap">
              <Loader />
            </div>
          ) : !users || users.length === 0 ? (
            <div className="empty-state">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <h3>No users found</h3>
              <p>There are no registered users in the system yet.</p>
            </div>
          ) : (
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Photo</th>
                    <th>Role</th>
                    <th>Since</th>
                  </tr>
                </thead>

                <AnimatePresence initial={false} mode="popLayout">
                  <tbody>{users.map((user, i) => tableRow(user, i))}</tbody>
                </AnimatePresence>
              </table>
            </div>
          )}
        </div>
      </main>
    </motion.section>
  );
};

export default Users;
