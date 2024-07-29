import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../utils";

const EditTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location?.state;
  console.log("location data: ", location);
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    duedate: task.duedate,
    priority: task.priority,
  });
  const handleChange = (e) => {
    console.log("handle change called: ", e);
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(`${url}task/${task._id}`, {
        title: taskData.title,
        description: taskData.description,
        duedate: taskData.duedate,
        priority: taskData.priority,
      });
      console.log(res);
      alert("Task Updated!");
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-edit-outer">
      <div className="title-container">Edit Task</div>
      <div className="task-line"></div>
      <form action="" onSubmit={handleSubmit}>
        <div className="add-title-container">
          <div className="label">Title</div>
          <input
            type="text"
            name="title"
            value={taskData.title}
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div className="add-description-container">
          <div className="label">Description</div>
          <textarea
            type="text"
            name="description"
            className="desc-textarea"
            value={taskData.description}
            placeholder="Description"
            rows={5}
            onChange={handleChange}
          />
        </div>
        <div className="duedate-priority-container">
          <div className="duedate-container">
            <div className="label">Complete By</div>
            <input
              type="date"
              name="duedate"
              id="date"
              value={taskData.duedate.slice(0, 10)}
              onChange={handleChange}
            />
          </div>
          <div className="priority-container">
            <div className="label">Priority</div>
            <select
              name="priority"
              id="priority"
              value={taskData.priority}
              onChange={handleChange}
            >
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
          </div>
        </div>
        <div className="buttons-container">
          <button
            className="cancel-button"
            onClick={() => {
              navigate("/tasks");
            }}
          >
            Cancel
          </button>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
