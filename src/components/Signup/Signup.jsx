import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupAction } from "../../redux/actions/userAction";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupState, setSignupState] = useState({
    name: "",
    username: "",
    role: "",
    password: "",
  });

  const { name, username, role, password } = signupState;

  const handleSignup = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      username,
      role,
      password,
    };

    const res = await dispatch(signupAction(payload));
    if (res?.status === 200) {
      navigate("/login");
    }
    setSignupState({
      name: "",
      username: "",
      role: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setSignupState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="signup">
      <form onSubmit={handleSignup}>
        <h2>The Cake Shop</h2>
        <br />
        <br />

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          name="name"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Enter your E-mail"
          value={username}
          name="username"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <div className="role-cont">
          <p>Register as</p>
          <div>
            <label>Admin</label>
            <input
              id="role-admin"
              type="radio"
              name="role"
              checked={role === "admin"}
              onChange={() =>
                setSignupState((prev) => ({ ...prev, role: "admin" }))
              }
              required
            />
          </div>
          <div>
            <label>User</label>
            <input
              id="role-user"
              type="radio"
              checked={role === "user"}
              name="role"
              onChange={() =>
                setSignupState((prev) => ({ ...prev, role: "user" }))
              }
            />
          </div>
        </div>

        <button type="submit">Sign Up</button>
        <br />
        <div>
          <span>Already a member ?</span>
          <Link to="/login">Click Here !</Link>
        </div>
      </form>
    </section>
  );
};

export default Signup;
