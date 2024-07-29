import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import setting from "../assets/settings.png";
import search from "../assets/search.png";
import sort from "../assets/sort.png";
import { useNavigate } from "react-router-dom";
import { url } from "../utils";

const Tasks = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("useremail");
  const [showLoader, setShowLoader] = useState(false);
  const name = localStorage.getItem("name");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const completedTasks = tasks.filter((task) => task.completed);
  const totalCompleted = completedTasks.length;
  const totalTasks = tasks?.length;

  const progressStyle = {
    width: `calc((${totalCompleted}/${totalTasks})*100%)`,
  };

  const fetchTasks = async () => {
    try {
      // setShowLoader(true);
      const res = await axios.get(`${url}task/user/${userName}`);
      // .then((res) => {
      console.log("received response: ", res);
      setTasks(res?.data);
      // setShowLoader(false);
      // });
    } catch (error) {
      console.log(error);
      // setShowLoader(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [refresh]);
  return (
    <>
      <div className="tasks-outer">
        <div className="tasks-header-container">
          <div className="tasks-header">
            <p>Namaste,</p>
            <h3>{name}</h3>
          </div>
          <div className="settings-icon">
            <img
              src={setting}
              alt="settings"
              onClick={() => {
                navigate("/profile");
              }}
            />
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
            <div className="progress-bar" style={progressStyle}></div>
          </div>
          <p>
            {totalCompleted}/{totalTasks} done
          </p>
        </div>
        <div className="tasks-container">
          {showLoader ? (
            <div>Loading...</div>
          ) : (
            <Task tasks={tasks} setRefresh={setRefresh} />
          )}
        </div>
        <button
          className="add-task"
          onClick={() => {
            navigate("/addtask");
          }}
        >
          + Add new task
        </button>
      </div>
    </>
  );
};

export default Tasks;
