
import {
  FaHome,
  FaListUl,
  FaRegCheckCircle,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";

const Sidebar = () => {
  const location = useLocation();

  const { user, isLoggedIn, logout } = useAuth();
  const { clearTasks } = useTasks();

  const handleLogout = () => {
    logout();
    clearTasks();
  };

  return (
    <div
      className="d-flex flex-column p-4 bg-white border-end"
      style={{
        width: "317px",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        className="d-flex align-items-center justify-content-center mb-5"
        style={{
          color: "#4338F5",
          fontSize: "32px",
          fontWeight: "700",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center me-3"
          style={{
            width: "42px",
            height: "42px",
            backgroundColor: "#4338F5",
            borderRadius: "8px",
            color: "white",
          }}
        >
          ✓
        </div>

        TaskFlow
      </div>

      {/* Navigation */}
      <ul className="nav flex-column gap-3">

        {/* TODAY */}
        <li>
          <Link
            to="/"
            className="nav-link d-flex align-items-center"
            style={{
              backgroundColor:
                location.pathname === "/"
                  ? "#F1F1FF"
                  : "transparent",
              color:
                location.pathname === "/"
                  ? "#4338F5"
                  : "#344054",
              borderRadius: "12px",
              padding: "18px",
              fontSize: "23px",
            }}
          >
            <FaHome className="me-4" size={25} />
            Today
          </Link>
        </li>

        {/* ALL TASKS */}
        <li>
          <Link
            to="/all-tasks"
            className="nav-link d-flex align-items-center"
            style={{
              backgroundColor:
                location.pathname === "/all-tasks"
                  ? "#F1F1FF"
                  : "transparent",
              color:
                location.pathname === "/all-tasks"
                  ? "#4338F5"
                  : "#344054",
              borderRadius: "12px",
              padding: "18px",
              fontSize: "23px",
            }}
          >
            <FaListUl className="me-4" size={25} />
            All Tasks
          </Link>
        </li>

        {/* COMPLETED */}
        <li>
          <Link
            to="/completed"
            className="nav-link d-flex align-items-center"
            style={{
              backgroundColor:
                location.pathname === "/completed"
                  ? "#F1F1FF"
                  : "transparent",
              color:
                location.pathname === "/completed"
                  ? "#4338F5"
                  : "#344054",
              borderRadius: "12px",
              padding: "18px",
              fontSize: "23px",
            }}
          >
            <FaRegCheckCircle
              className="me-4"
              size={25}
            />
            Completed
          </Link>
        </li>
      </ul>

      {/* Bottom */}
      <div className="mt-auto">
        <hr />

        {!isLoggedIn ? (
          /* NOT LOGGED IN */
          <div>
            <Link
              to="/signup"
              className="btn w-100 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#4338F5",
                color: "white",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "18px",
              }}
            >
              <FaSignInAlt className="me-2" />
              Sign Up
            </Link>

            <Link
              to="/login"
              className="btn w-100 mt-2"
              style={{
                border: "1px solid #4338F5",
                color: "#4338F5",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "17px",
              }}
            >
              Login
            </Link>
          </div>
        ) : (
          /* LOGGED IN */
          <div>
            {/* User */}
            <div
              className="d-flex align-items-center p-3 mb-2"
              style={{
                backgroundColor: "#F1F1FF",
                borderRadius: "12px",
              }}
            >
              <FaUser
                size={25}
                className="me-3"
                color="#4338F5"
              />

              <div>
                <div
                  style={{
                    fontWeight: "600",
                    color: "#101828",
                  }}
                >
                  {user?.name || "User"}
                </div>

                <small style={{ color: "#667085" }}>
                  {user?.email}
                </small>
              </div>
            </div>

            {/* Logout */}
            <button
              className="btn w-100 d-flex align-items-center justify-content-center"
              onClick={handleLogout}
              style={{
                color: "#EF4444",
                border: "1px solid #FECACA",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "17px",
              }}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

