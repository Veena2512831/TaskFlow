import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const TaskContext = createContext();

const API_URL = "http://localhost:5000/api/tasks";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get current authentication token
  const { token } = useAuth();

  // GET TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setTasks([]);
        return;
      }

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      console.log("Tasks from MongoDB:", data);

      setTasks(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks whenever login/user token changes
  useEffect(() => {
    if (token) {
      fetchTasks();
    } else {
      setTasks([]);
      setError("");
    }
  }, [token]);

  // CLEAR TASKS
  const clearTasks = () => {
    setTasks([]);
    setError("");
  };

  // ADD TASK
  const addTask = async (title, date, time) => {
    try {
      setError("");

      if (!token) {
        return false;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          date,
          time,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();

      console.log("New task:", newTask);

      setTasks((prevTasks) => [
        newTask,
        ...prevTasks,
      ]);

      return true;
    } catch (error) {
      console.error("Add error:", error);
      setError("Unable to add task.");
      return false;
    }
  };

  // COMPLETE / UNCOMPLETE TASK
  const toggleTask = async (id) => {
    try {
      setError("");

      if (!token) return;

      const task = tasks.find(
        (item) => item._id === id
      );

      if (!task) {
        console.log("Task not found:", id);
        return;
      }

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item._id === updatedTask._id
            ? updatedTask
            : item
        )
      );
    } catch (error) {
      console.error("Update error:", error);
      setError("Unable to update task.");
    }
  };

  // EDIT TASK
  const updateTask = async (
    id,
    title,
    date,
    time
  ) => {
    try {
      setError("");

      if (!token) return false;

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            date,
            time,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id
            ? updatedTask
            : task
        )
      );

      return true;
    } catch (error) {
      console.error("Edit error:", error);
      setError("Unable to edit task.");
      return false;
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      setError("");

      if (!token) return;

      console.log("Deleting task:", id);

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prevTasks) =>
        prevTasks.filter(
          (item) => item._id !== id
        )
      );

      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      setError("Unable to delete task.");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        toggleTask,
        updateTask,
        deleteTask,
        fetchTasks,
        clearTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// CUSTOM HOOK
export const useTasks = () => {
  return useContext(TaskContext);
};