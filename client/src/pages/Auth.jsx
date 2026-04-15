import { useState } from "react";

const API = "http://localhost:5000/api/auth";

export default function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const url = isLogin ? "/login" : "/register";

    const res = await fetch(API + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (isLogin && data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      alert(data.msg || "Success");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-80 space-y-3">

        <h1 className="text-xl font-bold text-center">
          {isLogin ? "Login" : "Register"}
        </h1>

        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        )}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="text-sm text-center cursor-pointer text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create account" : "Already have account?"}
        </p>
      </div>
    </div>
  );
}