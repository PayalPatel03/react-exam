import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      onLogin(email, password);
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark bg-gradient">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <h3 className="text-primary fw-bold"><IoFastFood /> Recipe Manager</h3>
          <p className="text-muted">Login to manage your recipes</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter any password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
