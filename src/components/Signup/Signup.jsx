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
    confirmPassword: "",
  });

  const { name, username, role, password, confirmPassword } = signupState;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name: key, value } = e.target;
    setFormError("");
    setSignupState((prev) => ({ ...prev, [key]: value }));
  };

  const handleRoleChange = (value) => {
    setFormError("");
    setSignupState((prev) => ({ ...prev, role: value }));
  };

  const validate = () => {
    if (!name || !username || !role || !password || !confirmPassword) {
      return "All fields are required.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormError("");
    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const payload = { name, username, role, password };
    setIsLoading(true);
    const res = await dispatch(signupAction(payload));
    if (res?.status === 200) {
      navigate("/login");
    }
    setIsLoading(false);
  };

  return (
    <section className="signup">
      <form className="signup__card" onSubmit={handleSignup} noValidate>
        <h2 className="signup__brand">The Cake Shop</h2>
        <p className="signup__subtitle">Create your account</p>

        {formError && (
          <p className="signup__error" role="alert">
            {formError}
          </p>
        )}

        <input
          className="signup__input"
          type="text"
          placeholder="Enter your name"
          value={name}
          name="name"
          onChange={handleChange}
          autoComplete="name"
        />

        <input
          className="signup__input"
          type="email"
          placeholder="Enter your E-mail"
          value={username}
          name="username"
          onChange={handleChange}
          autoComplete="email"
        />

        <div className="password-row">
          <div className="password-wrapper">
            <input
              className="signup__input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((s) => !s)}
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
                // eye
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
          </div>

          <div className="password-wrapper">
            <input
              className="signup__input"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword((s) => !s)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              title={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
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
                // eye
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
          </div>
        </div>

        <div className="role-cont">
          <p>Register as</p>

          <div className="role-options">
            <label className="role-label" htmlFor="role-admin">
              <input
                id="role-admin"
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => handleRoleChange("admin")}
                required
              />
              <span>Admin</span>
            </label>

            <label className="role-label" htmlFor="role-user">
              <input
                id="role-user"
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => handleRoleChange("user")}
              />
              <span>User</span>
            </label>
          </div>
        </div>

        <button className="signup__submit" type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Sign Up"}
        </button>

        <div className="signup__footer">
          <span>Already a member ?</span>
          <Link to="/login" className="signup__link">
            Click Here !
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Signup;
