import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Form from "./components/From";
import Table from "./components/Table";
import { IoFastFood } from "react-icons/io5";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load login state on initial load
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email.trim() !== "" && password.trim() !== "") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true"); 
    } else {
      alert("Please fill in both fields");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); 
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="bg-light min-vh-100">
          <nav className="navbar navbar-light bg-white shadow-sm p-3">
            <div className="container-fluid d-flex justify-content-between">
              <h4 className="text-primary m-0"><IoFastFood /> Recipe Dashboard</h4>
              <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
            </div>
          </nav>
          <Form />
          <Table />
        </div>
      )}
    </>
  );
};

export default App;
