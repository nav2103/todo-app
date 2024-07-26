import React, { useState } from "react";

const AddTask = () => {
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
    <div>
      <input
        type="text"
        name="title"
        value={taskData.title}
        placeholder="title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={taskData.description}
        placeholder="description"
        onChange={handleChange}
      />
    </div>
  );
};

export default AddTask;
