import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  isAuthenticatedAction,
  login,
  loginAction,
} from "../../redux/actions/userAction";
import { swalWarningMessage } from "../../swalPopups/swalPopups";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginState;

  const handleChange = (e) => {
    setLoginState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password)
      return swalWarningMessage("Username and Password is required.");

    const payload = {
      username,
      password,
    };
    const res = await dispatch(loginAction(payload));
    console.log(res);
    dispatch(isAuthenticatedAction());
    navigate("/");
  };

  return (
    <section className="login">
      <form onSubmit={handleLogin}>
        <h2>The Cake Shop</h2>
        <br />

        <br />
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

        <button type="submit">Login</button>
        <br />
        <div>
          <span>New User?</span>
          <Link to="/signup">Click Here !</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
