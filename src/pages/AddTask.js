import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../utils";

const AddTask = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("useremail");
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}task/add`, taskData);
      console.log(res);
      alert("Task Added!");
      setTaskData({
        title: "",
        description: "",
        duedate: "",
        priority: "",
      });
      navigate("/tasks");
    } catch (error) {
      alert("Task addition failed!");
      console.log(error);
    }
  };
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    adddate: Date.now(),
    completed: false,
    duedate: "",
    priority: "",
    user: userEmail,
  });
  const handleChange = (e) => {
    // console.log(e);
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  return (
    <div className="add-edit-outer">
      <div className="title-container">Add New Task</div>
      <div className="task-line"></div>
      <form action="" onSubmit={handleSumbit}>
        <div className="add-title-container">
          <div className="label">Title</div>
          <input
            type="text"
            name="title"
            value={taskData.title}
            required
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
            required
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
              id="duedate"
              onChange={handleChange}
              value={taskData.duedate}
              required
            />
          </div>
          <div className="priority-container">
            <div className="label">Priority</div>
            <select
              name="priority"
              id="priority"
              onChange={handleChange}
              value={taskData.priority}
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
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
