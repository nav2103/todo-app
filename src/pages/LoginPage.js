import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://task-manager-server-chi-three.vercel.app/user/login",
        {
          emailId: username,
          passWord: password,
        }
      );
      console.log(res);
      alert(res?.data?.message);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="auth-outer-container">
      <div className="auth-header-container">
        <div className="auth-heading">Welcome</div>
        <div className="auth-subheading">Login to continue</div>
      </div>
      <div className="auth-form-container">
        <div className="card">
          <form action="" className="auth-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="label">Email</div>
              <input
                type="text"
                className="input"
                placeholder="modi@gmail.com"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-container">
              <div className="label">Password</div>
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                minLength={6}
                required
              />
            </div>
            <button type="submit">Login</button>
            <div className="small-text">
              Don't have an account?{" "}
              <span className="primary-text">
                <Link to="/register" className="auth-btn">
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
