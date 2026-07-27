import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading || !user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand mb-0 h1">MERN Auth Dashboard</span>
        <button
          className="btn btn-outline-light ms-auto"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div className="container py-5">
        {/* Welcome Section */}
        <h2 className="mb-4">Welcome, {user.username}! 👋</h2>

        {/* User Info Card */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title">Your Profile</h5>
            <hr />
            <p className="card-text mb-1">
              <strong>Name:</strong> {user.username}
            </p>
            <p className="card-text mb-1">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="card-text mb-0">
              <strong>User ID:</strong> {user._id}
            </p>
          </div>
        </div>

        {/* Dummy Stats Cards */}
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card text-white bg-primary shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Total Logins</h6>
                <h2 className="fw-bold">12</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-success shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Account Status</h6>
                <h2 className="fw-bold">Active</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-info shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Member Since</h6>
                <h2 className="fw-bold">2026</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
