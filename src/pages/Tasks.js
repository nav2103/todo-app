import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import setting from "../assets/settings.png";
import search from "../assets/search.png";
import ascending from "../assets/ascending.png";
import descending from "../assets/descending.png";
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
  const [sortValue, setSortValue] = useState("byname");
  const [sortIcon, setSortIcon] = useState(descending);
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
    console.log(searchValue);
    if (value === "") {
      setFilteredTasks(tasks);
      return;
    }
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
  const handleSortChange = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setSortValue(value);
    console.log(sortValue);
    let sortedTasks = [];
    if (value === "byname") {
      sortedTasks = filteredTasks
        ?.slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      setFilteredTasks(sortedTasks);
      // console.log(filteredTasks);
    } else if (value === "bypriority") {
      sortedTasks = filteredTasks?.slice().sort((a, b) => {
        const priorityOrder = { low: 3, medium: 2, high: 1 };
        return (
          priorityOrder[a.priority.toLowerCase()] -
          priorityOrder[b.priority.toLowerCase()]
        );
      });
      setFilteredTasks(sortedTasks);
    } else if (value === "bydate") {
      sortedTasks = filteredTasks?.slice().sort((a, b) => {
        let aDate = new Date(a.duedate);
        let bDate = new Date(b.duedate);
        return aDate - bDate;
      });
      setFilteredTasks(sortedTasks);
      // console.log("filtered: ", filteredTasks);
    }
  };

  const reverseTask = () => {
    const reversedTasks = filteredTasks?.slice().reverse();
    setFilteredTasks(reversedTasks);
    setSortIcon((prev) => {
      if (prev === ascending) {
        return descending;
      } else {
        return ascending;
      }
    });
    // console.log("Reversed tasks: ", reversedTasks);
  };

  const fetchTasks = async () => {
    try {
      setShowLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 3500));
      const res = await axios.get(`${url}task/user/${userName}`).then((res) => {
        setTasks(res?.data);
        setFilteredTasks(res?.data);
        setShowLoader(false);
      });
      console.log("received response: ", res);
      // .then((res) => {});
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    //eslint-disable-next-line
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
          <p>{filterType} Tasks</p>
          <div className="task-title-filter">
            <select name="sort" id="sort" onChange={handleSortChange}>
              <option value="byname">By Name</option>
              <option value="bydate">By Date</option>
              <option value="bypriority">By Priority</option>
            </select>
            <img src={sortIcon} alt="sort" onClick={() => reverseTask()} />
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
            <div class="loader">
              <div class="loader-small"></div>
              <div class="loader-large"></div>
            </div>
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
