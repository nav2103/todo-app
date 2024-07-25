import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === cnfpassword) {
      try {
        const res = await axios
          .post("https://task-manager-server-chi-three.vercel.app/user/add", {
            name: name,
            emailId: username,
            passWord: password,
          })
          .then(() => {
            alert("Registration Successful!");
            console.log(res);
            setUsername("");
            setCnfPassword("");
            setName("");
            setPassword("");
            navigate("/login");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Password doesn't match.");
    }
  };
  return (
    <div className="auth-outer-container">
      <div className="auth-header-container">
        <div className="auth-heading">Register Yourself</div>
      </div>
      <div className="auth-form-container">
        <div className="card">
          <form action="" className="auth-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="label">Name</div>
              <input
                type="text"
                className="input"
                placeholder="Rahul Gandhi"
                value={name}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-container">
              <div className="label">Email</div>
              <input
                type="email"
                className="input"
                placeholder="gandhi@gmail.com"
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
                required
              />
            </div>
            <div className="input-container">
              <div className="label">Confirm Password</div>
              <input
                type="password"
                className="input"
                placeholder="Re-enter Password"
                value={cnfpassword}
                onChange={(e) => {
                  setCnfPassword(e.target.value);
                }}
                required
              />
            </div>
            <button type="submit">Register</button>
            <div className="small-text">
              Already have an account?{" "}
              <span className="primary-text">
                <Link to="/login" className="auth-btn">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
