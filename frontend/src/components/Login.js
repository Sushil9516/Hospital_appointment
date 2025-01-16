import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          alert("Login successful");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleLogin} className="register-form">
      <h2>Login</h2>
      <hr className="stylish-line" />

      <input
        style={{ fontSize: "22px" }}
        type="email"
        placeholder="UserName or (Email)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ fontSize: "22px" }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{ fontSize: "22px" }} type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
