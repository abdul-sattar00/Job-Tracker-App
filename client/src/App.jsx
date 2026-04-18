import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Auth from "./pages/AuthWrapper";
import Dashboard from "./Dashboard";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Routes>
      <Route path="/" element={!token ? <Auth setToken={setToken} /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  );
}