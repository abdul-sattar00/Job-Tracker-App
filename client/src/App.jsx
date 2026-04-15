import { useState } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./Dashboard";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Auth setToken={setToken} />;
  }

  return <Dashboard />;
}