import {
  FaCalendarAlt,
  FaClock,
  FaTrash,
} from "react-icons/fa";

import { useTasks } from "../context/TaskContext";

const Taskcomplete = () => {
  const {
    tasks,
    toggleTask,
    deleteTask,
  } = useTasks();

  // Only completed tasks
  const completedTasks = tasks.filter(
    (task) => task.completed
  );

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
        className="bg-white border-bottom"
        style={{
          padding: "23px 32px",
        }}
      >
        <h1
          className="mb-1"
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#101828",
          }}
        >
          Completed Tasks
        </h1>

        <p
          className="mb-0"
          style={{
            color: "#667085",
            fontSize: "16px",
          }}
        >
          Here you can see all your completed tasks.
        </p>
      </div>

      {/* Content */}
      <div className="p-4">
        <div
          className="bg-white p-4"
          style={{
            borderRadius: "15px",
            border: "1px solid #E4E7EC",
          }}
        >
          <h4
            className="mb-4"
            style={{
              fontWeight: "700",
              color: "#101828",
            }}
          >
            Completed Tasks
          </h4>

          {completedTasks.length === 0 ? (
            <div
              className="text-center py-5"
              style={{
                color: "#98A2B3",
                fontSize: "18px",
              }}
            >
              No completed tasks yet.
            </div>
          ) : (
            completedTasks.map((task) => (
              <div
                key={task._id}
                className="d-flex align-items-center justify-content-between p-3 mb-3"
                style={{
                  border: "1px solid #E4E7EC",
                  borderRadius: "10px",
                }}
              >
                {/* Task */}
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id)}
                    style={{
                      width: "22px",
                      height: "22px",
                      accentColor: "#4338F5",
                      marginRight: "18px",
                      cursor: "pointer",
                    }}
                  />

                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        color: "#667085",
                        textDecoration: "line-through",
                      }}
                    >
                      {task.title}
                    </div>

                    {/* Date + Time */}
                    <div
                      className="d-flex gap-3 mt-1"
                      style={{
                        color: "#98A2B3",
                        fontSize: "14px",
                      }}
                    >
                      <span>
                        <FaCalendarAlt className="me-1" />
                        {task.date}
                      </span>

                      <span>
                        <FaClock className="me-1" />
                        {task.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete */}
                <button
                  className="btn"
                  onClick={() => deleteTask(task._id)}
                  style={{
                    color: "#EF4444",
                    fontSize: "18px",
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Taskcomplete;