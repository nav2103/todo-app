import React from "react";
import checkbox from "../assets/checkbox.png";
import uncheckbox from "../assets/uncheckbox.png";
import flag from "../assets/flag.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../utils";

const Task = ({ tasks, setRefresh }) => {
  const navigate = useNavigate();

  const handleClick = async (id) => {
    try {
      const res = await axios.put(`${url}task/status/${id}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {tasks &&
        tasks?.map((task, index) => {
          let priorityClass = "";

          switch (task.priority) {
            case "high":
              priorityClass = "high-priority";
              break;
            case "low":
              priorityClass = "low-priority";
              break;
            default:
              priorityClass = "";
          }
          return (
            <div className="card task-box" key={index}>
              <div className="checkbox-container">
                <img
                  src={task.completed ? checkbox : uncheckbox}
                  alt="checkbox"
                  onClick={() => {
                    handleClick(task._id);
                  }}
                />
              </div>
              <div
                className="task-content-container"
                onClick={() => navigate("/details", { state: task })}
              >
                <div className="task-title-container">
                  <div className="task-title">{task.title}</div>
                  <div className={`task-priority ${priorityClass}`}>
                    {task.priority + " priority"}
                  </div>
                </div>
                <div className="task-desc">{task.description}</div>
                <div className="task-date-container">
                  <img src={flag} alt="flag" />
                  <div className="task-date">
                    {task.duedate.slice(0, 10).split("-").reverse().join("-")}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Task;
