import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  isAuthenticatedAction,
  loginAction,
} from "../../redux/actions/userAction";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginState;

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLoginState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleShowPassword = () => setShowPassword((s) => !s);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Username and Password is required.");
      return;
    }
    setIsLoading(true);
    const payload = { username, password };
    const res = await dispatch(loginAction(payload));
    if (res?.status === 200) {
      await dispatch(isAuthenticatedAction());
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <section className="login">
      <form className="login__card" onSubmit={handleLogin} noValidate>
        <h2 className="login__brand">The Cake Shop</h2>
        <p className="login__subtitle">Welcome back</p>
        <label className="login__field">
          <span className="sr-only">Email</span>
          <input
            type="email"
            placeholder="Enter your E-mail"
            value={username}
            name="username"
            onChange={handleChange}
            required
            autoComplete="email"
            className="login__input"
            aria-label="Email"
          />
        </label>

        <label className="login__field login__field--password">
          <span className="sr-only">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            name="password"
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="login__input"
            aria-label="Password"
          />
          <button
            type="button"
            className="login__toggle"
            onClick={toggleShowPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.94 17.94A9.99 9.99 0 0 1 12 19.75C6.9 19.75 2.4 16.13 1 12a13.36 13.36 0 0 1 3.52-5.1"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.9 9.9a3 3 0 0 1 4.24 4.24M22 2 2 22"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 12C2.4 15.13 6.9 18.75 12 18.75c5.1 0 9.6-3.62 11-6.75-1.4-3.13-5.9-6.75-11-6.75S2.4 8.87 1 12Z"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            )}
          </button>
        </label>

        <button className="login__submit" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Login"}
        </button>

        <div className="login__footer">
          <span>New User?</span>
          <Link to="/signup" className="login__link">
            Click Here !
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
