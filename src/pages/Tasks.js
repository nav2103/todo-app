import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import setting from "../assets/settings.png";
import search from "../assets/search.png";
import sort from "../assets/sort.png";

const Tasks = () => {
  const userName = localStorage.getItem("useremail");
  const name = localStorage.getItem("name");
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const res = await axios
        .get(
          `https://task-manager-server-chi-three.vercel.app/task/user/${userName}`
        )
        .then((res) => {
          console.log("received response: ", res);
          setTasks(res?.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <div className="tasks-outer">
        <div className="tasks-header-container">
          <div className="tasks-header">
            <p>Good Morning</p>
            <h3>{name}</h3>
          </div>
          <div className="settings-icon">
            <img src={setting} alt="settings" />
          </div>
        </div>
        <div className="task-search-bar">
          <img src={search} alt="search" />
          <input type="text" placeholder="Search All Tasks" />
          <select name="sort" id="sort">
            <option value="byname">By Name</option>
            <option value="bydate">By Date</option>
          </select>
        </div>

        <div className="task-options-container">
          <div class="task-option active">All</div>
          <div class="task-option ">Completed</div>
          <div class="task-option ">Pending</div>
          <div class="task-option ">Today</div>
          <div class="task-option ">Delayed</div>
        </div>
        <div className="task-line"></div>
        <div className="all-tasks-container">
          <p>All Tasks</p>
          <div className="task-title-filter">
            <img src={sort} alt="sort" />
          </div>
        </div>
        <div className="task-progress-container">
          <div className="progress-bar-bg">
            <div className="progress-bar"></div>
          </div>
          <p>1/3 done</p>
        </div>
        <div className="tasks-container">
          <Task tasks={tasks} />
        </div>
        <button className="add-task">+ Add new task</button>
      </div>
    </>
  );
};

export default Tasks;
