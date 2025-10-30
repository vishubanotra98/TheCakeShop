import React, { useState } from "react";
import { motion } from "framer-motion";
import cake from "../../assets/cake.png";
import { userFeedBackAction } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Contact = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (!name || !email || !message) {
      toast.error("Please fill all the fields to proceed.");
      setLoad(false);
      return;
    }
    const payload = {
      name,
      email,
      message,
    };
    const res = await dispatch(userFeedBackAction(payload));
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error("Error Sending Feedback.");
    }
    setName("");
    setEmail("");
    setMessage("");
    setLoad(false);
  };

  return (
    <section className="contact">
      <motion.form
        initial={{
          x: "-100vw",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ delay: 0.3 }}
        onSubmit={formHandler}
      >
        <h2>Contact Us</h2>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Message"
          name="message"
          id=""
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit" disabled={load}>
          {load ? "Sending..." : "Send"}
        </button>
      </motion.form>

      <motion.div
        className="formBorder"
        initial={{
          x: "100vw",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          initial={{
            x: "50%",
            y: "-100vh",
            opacity: 0,
          }}
          animate={{
            x: "50%",
            y: "-50%",
            opacity: 1,
          }}
          transition={{ delay: 0.5 }}
        >
          <img src={cake} alt="cake" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
