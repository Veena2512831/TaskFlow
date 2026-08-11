import { useState } from "react";
import {
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { useTasks } from "../context/TaskContext";

const AllTask = () => {
  const {
    tasks,
    toggleTask,
    deleteTask,
    updateTask,
  } = useTasks();

  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  // Start Editing
  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDate(task.date);
    setEditTime(task.time);
  };

  // Save Edited Task
  const handleSave = async (id) => {
    if (!editTitle.trim() || !editDate || !editTime) {
      return;
    }

    const success = await updateTask(
      id,
      editTitle,
      editDate,
      editTime
    );

    if (success) {
      setEditingId(null);
      setEditTitle("");
      setEditDate("");
      setEditTime("");
    }
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDate("");
    setEditTime("");
  };

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
          All Tasks
        </h1>

        <p
          className="mb-0"
          style={{
            color: "#667085",
            fontSize: "16px",
          }}
        >
          Here you can see all your tasks.
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
            All Tasks
          </h4>

          {/* No Tasks */}
          {tasks.length === 0 ? (
            <div
              className="text-center py-5"
              style={{
                color: "#98A2B3",
                fontSize: "18px",
              }}
            >
              No tasks added yet.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="p-3 mb-3"
                style={{
                  border: "1px solid #E4E7EC",
                  borderRadius: "10px",
                }}
              >
                {editingId === task._id ? (
                  /* ================= EDIT MODE ================= */
                  <div>
                    {/* Title */}
                    <input
                      type="text"
                      className="form-control mb-3"
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(e.target.value)
                      }
                      placeholder="Task title"
                      style={{
                        height: "50px",
                        borderRadius: "8px",
                      }}
                    />

                    {/* Date + Time */}
                    <div className="d-flex gap-3 mb-3">
                      <div className="position-relative flex-grow-1">
                        <FaCalendarAlt
                          className="position-absolute"
                          style={{
                            left: "15px",
                            top: "17px",
                            color: "#4338F5",
                            zIndex: 2,
                            pointerEvents: "none",
                          }}
                        />

                        <input
                          type="date"
                          className="form-control"
                          value={editDate}
                          onChange={(e) =>
                            setEditDate(e.target.value)
                          }
                          style={{
                            height: "50px",
                            paddingLeft: "45px",
                            borderRadius: "8px",
                          }}
                        />
                      </div>

                      <div className="position-relative flex-grow-1">
                        <FaClock
                          className="position-absolute"
                          style={{
                            left: "15px",
                            top: "17px",
                            color: "#4338F5",
                            zIndex: 2,
                            pointerEvents: "none",
                          }}
                        />

                        <input
                          type="time"
                          className="form-control"
                          value={editTime}
                          onChange={(e) =>
                            setEditTime(e.target.value)
                          }
                          style={{
                            height: "50px",
                            paddingLeft: "45px",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Save + Cancel */}
                    <div className="d-flex gap-2">
                      <button
                        className="btn d-flex align-items-center"
                        onClick={() =>
                          handleSave(task._id)
                        }
                        style={{
                          backgroundColor: "#4338F5",
                          color: "white",
                          borderRadius: "8px",
                        }}
                      >
                        <FaSave className="me-2" />
                        Save
                      </button>

                      <button
                        className="btn btn-light"
                        onClick={handleCancel}
                        style={{
                          borderRadius: "8px",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ================= NORMAL MODE ================= */
                  <div className="d-flex align-items-center justify-content-between">
                    {/* Left Side */}
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          toggleTask(task._id)
                        }
                        style={{
                          width: "22px",
                          height: "22px",
                          accentColor: "#4338F5",
                          marginRight: "18px",
                          cursor: "pointer",
                        }}
                      />

                      <div>
                        {/* Task Title */}
                        <div
                          style={{
                            fontSize: "18px",
                            color: task.completed
                              ? "#98A2B3"
                              : "#344054",
                            textDecoration:
                              task.completed
                                ? "line-through"
                                : "none",
                          }}
                        >
                          {task.title}
                        </div>

                        {/* Date + Time */}
                        <div
                          className="d-flex gap-3 mt-1"
                          style={{
                            color: "#667085",
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

                    {/* Actions */}
                    <div className="d-flex align-items-center gap-2">
                      {/* Edit */}
                      <button
                        className="btn"
                        onClick={() =>
                          handleEdit(task)
                        }
                        style={{
                          color: "#4338F5",
                          fontSize: "18px",
                        }}
                        title="Edit Task"
                      >
                        <FaEdit />
                      </button>

                      {/* Delete */}
                      <button
                        className="btn"
                        onClick={() =>
                          deleteTask(task._id)
                        }
                        style={{
                          color: "#EF4444",
                          fontSize: "18px",
                        }}
                        title="Delete Task"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTask;