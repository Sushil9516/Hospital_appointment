import React, { useState, useEffect } from "react";
import AppointmentForm from "../components/AppointmentForm.js";
const BookAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("/appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="BookAppointment-container">
      <h1>BookAppointment</h1>

      <AppointmentForm
        onNewAppointment={(appt) => setAppointments([...appointments, appt])}
      />
    </div>
  );
};

export default BookAppointment;
