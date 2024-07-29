import React from "react";
import { useNavigate } from "react-router-dom";

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
      <h1>My Profile</h1>
      <div className="details-container">
        <div className="name-container">{name}</div>
        <div className="email-container">{useremail}</div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
