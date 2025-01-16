import React, { useState } from "react";

const AppointmentForm = ({ onNewAppointment }) => {
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(localStorage.getItem("token"));
    console.log({ doctor, patient, date, time });

    fetch("http://localhost:4000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ doctor, patient, date, time }),
    })
      .then((res) => {
        console.log("ressssssssssss", res);
        console.log("ok", res.ok);

        if (!res.ok) {
          throw new Error("Failed to book appointment");
        }
        return res.json();
      })
      .then((data) => {
        onNewAppointment(data);
        alert("Appointment booked successfully");
      })
      .catch((err) => console.error("Error:", err.message));
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Book Appointment</h2>
      <hr className="stylish-line" />

      <input
        type="text"
        placeholder="Doctor ID"
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Patient ID"
        value={patient}
        onChange={(e) => setPatient(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Book</button>
    </form>
  );
};

export default AppointmentForm;
