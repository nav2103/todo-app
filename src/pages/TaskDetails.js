import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import flagIcon from "../assets/flag.png";
import axios from "axios";
import { url } from "../utils";

const TaskDetails = () => {
  const location = useLocation();
  console.log("location data: ", location);
  const taskData = location?.state;
  const navigate = useNavigate();
  let priorityClass = "";

  switch (taskData.priority) {
    case "high":
      priorityClass = "high-priority";
      break;
    case "low":
      priorityClass = "low-priority";
      break;
    default:
      priorityClass = "";
  }
  const handleDelete = async () => {
    try {
      const res = await axios
        .delete(`${url}task/delete/${taskData?._id}`)
        .then(() => {
          alert("Task Deleted Successfully!");
          navigate("/tasks");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="task-details-outer">
      <div className="task-details-options">
        <div className="task-add-date">
          Added on{" "}
          {taskData.adddate.slice(0, 10).split("-").reverse().join("-")}
        </div>
        <div className="task-option-icons">
          <img src={deleteIcon} alt="delete" onClick={handleDelete} />
          <img
            src={editIcon}
            alt="edit"
            onClick={() => {
              navigate("/edittask", { state: taskData });
            }}
          />
        </div>
      </div>
      <div className="task-details-title">{taskData.title}</div>
      <div className="task-date-priority-container">
        <div className="task-date-container">
          <img src={flagIcon} alt="flag" />
          <div className="due-date">
            {taskData.duedate.slice(0, 10).split("-").reverse().join("-")}
          </div>
        </div>
        <div className={`task-priority ${priorityClass}`}>
          {taskData.priority + " priority"}
        </div>
      </div>
      <div className="task-line"></div>
      <div className="task-description">{taskData.description}</div>
      <button
        className="back-to-task-btn"
        onClick={() => {
          navigate("/tasks");
        }}
      >
        Back to tasks
      </button>
    </div>
  );
};

export default TaskDetails;
