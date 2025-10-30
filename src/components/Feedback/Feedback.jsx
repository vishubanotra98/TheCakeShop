import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../layout/Loader";
import { fetchMessagesAction } from "../../redux/actions/userAction";

export default function Feedback() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      const res = await dispatch(fetchMessagesAction());
      if (res && res.messages) setMessages(res.messages);
      setIsLoading(false);
    };

    fetchMessages();
  }, [dispatch]);

  const tableRow = (message, i) => {
    const key = message._id || message.id || i;
    return (
      <motion.tr
        layout
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28 }}
        key={key}
        className="data-row"
      >
        <td data-label="Name">{message.name || "—"}</td>
        <td data-label="Email">{message.email || "—"}</td>
        <td data-label="Message" className="message-cell">
          {message.message || "—"}
        </td>
      </motion.tr>
    );
  };

  return isLoading ? (
    <div className="loader-wrap">
      <Loader />
    </div>
  ) : (
    <motion.section
      className="feedbackClass"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main>
        <header className="feedback-header">
          <h1>Feedback</h1>
        </header>

        <div className="table-wrap">
          {messages?.length === 0 ? (
            <div className="empty-state">No messages yet.</div>
          ) : (
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email-Id</th>
                    <th>Message</th>
                  </tr>
                </thead>

                <AnimatePresence initial={false} mode="popLayout">
                  <tbody>{messages.map((m, i) => tableRow(m, i))}</tbody>
                </AnimatePresence>
              </table>
            </div>
          )}
        </div>
      </main>
    </motion.section>
  );
}
