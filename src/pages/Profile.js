import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png";
import userIcon from "../assets/user.png";

const Profile = () => {
  const useremail = localStorage.getItem("useremail");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("useremail");
    localStorage.removeItem("name");
    alert("Logout Successful!");
    navigate("/logout");
  };
  return (
    <div className="task-profile-outer">
      <div className="task-profile-bg"></div>
      <div className="back-button">
        <img src={backIcon} alt="back" onClick={() => navigate("/tasks")} />
      </div>
      <div className="profile-content">
        <div className="my-profile">My Profile</div>
        <img src={userIcon} alt="user" />
      </div>
      <div className="details-container">
        <div className="name-container">{name}</div>
        <div className="email-container">{useremail}</div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
