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
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("text");
  const completedTasks = filteredTasks.filter((task) => task.completed);
  const totalCompleted = completedTasks.length;
  const totalTasks = filteredTasks?.length;
  const progressStyle = {
    width: `calc((${totalCompleted}/${totalTasks})*100%)`,
  };

  const handleAll = () => {
    setFilteredTasks(tasks);
    setFilterType("all");
  };
  const handleCompleted = () => {
    const completed = tasks.filter((task) => task.completed);
    // console.log(completed);
    setFilteredTasks(completed);
    setFilterType("completed");
  };
  const handlePending = () => {
    const pendingTasks = tasks.filter((task) => !task.completed);
    setFilteredTasks(pendingTasks);
    setFilterType("pending");
  };
  const handleToday = () => {
    const todaysTasks = tasks.filter((task) => {
      const taskDueDate = new Date(task.duedate);
      const today = new Date();
      return (
        taskDueDate.toISOString().slice(0, 10) ===
        today.toISOString().slice(0, 10)
      );
    });
    setFilteredTasks(todaysTasks);
    setFilterType("today");
  };
  const handleDelayed = () => {
    const delayedTasks = tasks.filter((task) => {
      const taskDueDate = new Date(task.duedate);
      const today = new Date();
      return (
        taskDueDate.toISOString().slice(0, 10) <
        today.toISOString().slice(0, 10)
      );
    });
    setFilterType("delayed");
    setFilteredTasks(delayedTasks);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    setSearchValue(value);
    if (value === "") {
      setFilteredTasks(tasks);
      return;
    }
    // const searchedTasks = tasks.filter((task) => {
    //   const title = task?.title?.toLowerCase();
    //   return title.includes(value);
    // });
    // console.log(searchedTasks);
    let searchedTasks = [];
    if (searchType === "text") {
      searchedTasks = tasks.filter((task) => {
        const title = task?.title?.toLowerCase();
        return title.includes(value);
      });
    } else if (searchType === "date") {
      searchedTasks = tasks.filter((task) => {
        const taskDueDate = new Date(task.duedate).toISOString().slice(0, 10);
        return taskDueDate.includes(value);
      });
    }
    setFilteredTasks(searchedTasks);
  };

  const fetchTasks = async () => {
    try {
      setShowLoader(true);
      const res = await axios.get(`${url}task/user/${userName}`).then((res) => {
        console.log("received response: ", res);
        setTasks(res?.data);
        setFilteredTasks(res?.data);
        setShowLoader(false);
      });
    } catch (error) {
      console.log(error);
      setShowLoader(false);
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
          <input
            type={searchType}
            placeholder={
              searchType === "text" ? "Search All Tasks" : "Search by Date"
            }
            onChange={handleSearchChange}
          />
          <select
            name="sort"
            id="sort"
            onChange={(e) => {
              setSearchType(e.target.value === "byname" ? "text" : "date");
              // setRefresh((prev) => !prev);
            }}
          >
            <option value="byname">By Name</option>
            <option value="bydate">By Date</option>
          </select>
        </div>

        <div className="task-options-container">
          <div
            className={`task-option ${filterType === "all" ? "active" : ""}`}
            onClick={handleAll}
          >
            All
          </div>
          <div
            className={`task-option ${
              filterType === "completed" ? "active" : ""
            }`}
            onClick={handleCompleted}
          >
            Completed
          </div>
          <div
            className={`task-option ${
              filterType === "pending" ? "active" : ""
            }`}
            onClick={handlePending}
          >
            Pending
          </div>
          <div
            className={`task-option ${filterType === "today" ? "active" : ""}`}
            onClick={handleToday}
          >
            Today
          </div>
          <div
            className={`task-option ${
              filterType === "delayed" ? "active" : ""
            }`}
            onClick={handleDelayed}
          >
            Delayed
          </div>
        </div>
        <div className="task-line">{""}</div>
        <div className="all-tasks-container">
          <p>All Tasks</p>
          <div className="task-title-filter">
            <select name="sort" id="sort">
              <option value="byname">By Name</option>
              <option value="bydate">By Date</option>
              <option value="bypriority">By Priority</option>
            </select>
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
            <Task
              tasks={filteredTasks}
              setRefresh={setRefresh}
              setFilterType={setFilterType}
            />
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
