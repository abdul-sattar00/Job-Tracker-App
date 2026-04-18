import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";

export default function AuthWrapper({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <Login switchToRegister={() => setIsLogin(false)} setToken={setToken} />
  ) : (
    <Register switchToLogin={() => setIsLogin(true)} />
  );
}