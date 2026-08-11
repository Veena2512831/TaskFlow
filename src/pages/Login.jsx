
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://taskflow-backend-zwks.onrender.com/api/tasks";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user through AuthContext
      login(data.token, data.user);

      // Go to Todo page
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">
              Login
            </h2>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>

            <p className="text-center mt-3 mb-0">
              Don't have an account?{" "}
              <Link to="/signup">
                Sign Up
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

