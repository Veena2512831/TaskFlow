import { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

const Todo = () => {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const { isLoggedIn } = useAuth();

  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  // Add Task
  const handleAddTask = async () => {
    if (!isLoggedIn) return;

    if (!task.trim() || !date || !time) {
      return;
    }

    const success = await addTask(task, date, time);

    if (success) {
      setTask("");
      setDate("");
      setTime("");
    }
  };

  // Only today's tasks
  const todayTasks = tasks.filter(
    (item) => item.date === today
  );

  // Completed tasks
  const completedTasks = todayTasks.filter(
    (item) => item.completed
  ).length;

  return (
    <div
      className="flex-grow-1"
      style={{
        backgroundColor: "#F8F9FC",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center bg-white border-bottom"
        style={{
          padding: "23px 32px",
        }}
      >
        <h1
          className="mb-0"
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#101828",
          }}
        >
          My Todo List
        </h1>

        <button
          className="btn d-flex align-items-center"
          disabled={!isLoggedIn}
          onClick={() =>
            document.getElementById("taskInput").focus()
          }
          style={{
            backgroundColor: isLoggedIn
              ? "#4338F5"
              : "#98A2B3",
            color: "white",
            padding: "14px 28px",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: isLoggedIn
              ? "pointer"
              : "not-allowed",
          }}
        >
          <FaPlus className="me-2" size={18} />
          Add Task
        </button>
      </div>

      {/* Main Content */}
      <div className="p-4">

        {/* Add Task Box */}
        <div
          className="bg-white p-4 mb-4"
          style={{
            borderRadius: "15px",
            border: "1px solid #E4E7EC",
          }}
        >
          {/* Task Input */}
          <div className="mb-3">
            <input
              id="taskInput"
              type="text"
              className="form-control"
              placeholder={
                isLoggedIn
                  ? "Enter a new task..."
                  : "Login to add a task"
              }
              value={task}
              disabled={!isLoggedIn}
              onChange={(e) =>
                setTask(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTask();
                }
              }}
              style={{
                height: "65px",
                fontSize: "20px",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Date + Time + Add */}
          <div className="d-flex gap-3">

            {/* Date */}
            <div className="position-relative flex-grow-1">
              <FaCalendarAlt
                className="position-absolute"
                style={{
                  left: "15px",
                  top: "18px",
                  color: "#4338F5",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              <input
                type="date"
                className="form-control"
                value={date}
                min={today}
                disabled={!isLoggedIn}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                style={{
                  height: "55px",
                  fontSize: "17px",
                  borderRadius: "10px",
                  paddingLeft: "45px",
                  cursor: isLoggedIn
                    ? "pointer"
                    : "not-allowed",
                }}
              />
            </div>

            {/* Time */}
            <div className="position-relative flex-grow-1">
              <FaClock
                className="position-absolute"
                style={{
                  left: "15px",
                  top: "18px",
                  color: "#4338F5",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              <input
                type="time"
                className="form-control"
                value={time}
                disabled={!isLoggedIn}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                style={{
                  height: "55px",
                  fontSize: "17px",
                  borderRadius: "10px",
                  paddingLeft: "45px",
                  cursor: isLoggedIn
                    ? "pointer"
                    : "not-allowed",
                }}
              />
            </div>

            {/* Add Button */}
            <button
              className="btn"
              onClick={handleAddTask}
              disabled={!isLoggedIn}
              style={{
                backgroundColor: isLoggedIn
                  ? "#4338F5"
                  : "#98A2B3",
                color: "white",
                width: "140px",
                fontSize: "20px",
                borderRadius: "10px",
                cursor: isLoggedIn
                  ? "pointer"
                  : "not-allowed",
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Today's Tasks */}
        <div
          className="bg-white"
          style={{
            borderRadius: "15px",
            border: "1px solid #E4E7EC",
          }}
        >
          <div className="p-4">

            <h2
              style={{
                fontSize: "27px",
                fontWeight: "700",
                color: "#101828",
              }}
            >
              Today's Tasks
            </h2>

            {/* Tasks */}
            <div className="mt-4">

              {todayTasks.length === 0 ? (
                <div
                  className="text-center py-5"
                  style={{
                    color: "#98A2B3",
                    fontSize: "18px",
                  }}
                >
                  No tasks for today.
                </div>
              ) : (
                todayTasks.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex align-items-center justify-content-between mb-3 p-3"
                    style={{
                      border: "1px solid #E4E7EC",
                      borderRadius: "12px",
                      minHeight: "90px",
                    }}
                  >

                    {/* Left Side */}
                    <div className="d-flex align-items-center">

                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={item.completed}
                        disabled={!isLoggedIn}
                        onChange={() =>
                          toggleTask(item._id)
                        }
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "25px",
                          accentColor: "#4338F5",
                          cursor: isLoggedIn
                            ? "pointer"
                            : "not-allowed",
                        }}
                      />

                      {/* Task Details */}
                      <div>

                        {/* Task Name */}
                        <div
                          style={{
                            fontSize: "22px",
                            color: item.completed
                              ? "#667085"
                              : "#101828",
                            textDecoration:
                              item.completed
                                ? "line-through"
                                : "none",
                          }}
                        >
                          {item.title}
                        </div>

                        {/* Date + Time */}
                        <div
                          className="d-flex align-items-center gap-3 mt-1"
                          style={{
                            fontSize: "15px",
                            color: "#667085",
                          }}
                        >
                          <span>
                            <FaCalendarAlt className="me-1" />
                            {item.date}
                          </span>

                          <span>
                            <FaClock className="me-1" />
                            {item.time}
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      className="btn"
                      onClick={() =>
                        deleteTask(item._id)
                      }
                      disabled={!isLoggedIn}
                      style={{
                        color: isLoggedIn
                          ? "#EF233C"
                          : "#98A2B3",
                        fontSize: "20px",
                        cursor: isLoggedIn
                          ? "pointer"
                          : "not-allowed",
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}

            </div>
          </div>

          {/* Footer */}
          <div
            className="d-flex justify-content-between border-top"
            style={{
              padding: "25px 35px",
              color: "#475467",
              fontSize: "18px",
            }}
          >
            <span>
              {todayTasks.length} tasks today
            </span>

            <span>
              {completedTasks} completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;