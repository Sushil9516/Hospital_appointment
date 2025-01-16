import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Registration successful");
      })

      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleRegister} className="register-form">
      <h2>Register</h2>
      <hr className="stylish-line" />

      <input
        type="text"
        placeholder="Name"
        style={{ fontSize: "22px" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={{ fontSize: "22px" }}
        type="email"
        placeholder="Email"
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
      <select
        style={{ fontSize: "22px" }}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
      <button style={{ fontSize: "22px" }} type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
