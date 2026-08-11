import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Today from "./pages/Today";
import Completed from "./pages/Completed";
import AllTasks from "./pages/AllTasks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./components/ProtectedRoute";

import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>

            {/* Protected Pages */}

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Today />
                </ProtectedRoute>
              }
            />

            <Route
              path="/all-tasks"
              element={
                <ProtectedRoute>
                  <AllTasks />
                </ProtectedRoute>
              }
            />

            <Route
              path="/completed"
              element={
                <ProtectedRoute>
                  <Completed />
                </ProtectedRoute>
              }
            />

            {/* Public Pages */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

