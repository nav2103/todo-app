import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location?.state;
  console.log("location data: ", location);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    completeBy: "",
    priority: "",
  });
  const handleChange = (e) => {
    console.log(e);
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  return (
    <div className="add-edit-outer">
      <div className="title-container">Edit Task</div>
      <div className="task-line"></div>
      <div className="add-title-container">
        <div className="label">Title</div>
        <input
          type="text"
          name="title"
          value={task.title}
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
          value={task.description}
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
            name="date"
            id="date"
            value={task.duedate.slice(0, 10)}
          />
        </div>
        <div className="priority-container">
          <div className="label">Priority</div>
          <select name="priority" id="priority" value={task.priority}>
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
        <button>Update</button>
      </div>
    </div>
  );
};

export default EditTask;
