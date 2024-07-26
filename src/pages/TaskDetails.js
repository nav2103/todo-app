import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TaskDetails = () => {
  const location = useLocation();
  console.log("location data: ", location);
  const taskData = location?.state;
  const navigate = useNavigate();
  return (
    <div>
      <h4>{taskData.title}</h4>
    </div>
  );
};

export default TaskDetails;
