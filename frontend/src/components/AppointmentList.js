import React, { useState, useEffect } from "react";
import "./Appointment.css";
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:4000/appointments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching appointments");
        }

        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error canceling appointment");
      }

      setAppointments(
        appointments.filter((appointment) => appointment._id !== id)
      );
    } catch (err) {
      setError("Error canceling appointment");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Time</th>
            <th>Cancel Appointment</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.doctor.name}</td>
              <td>{appointment.patient.name}</td>
              <td>{appointment.date}</td>
              <td>
                {" "}
                <button
                  onClick={() => cancelAppointment(appointment._id)}
                  className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700 focus:outline-none"
                  aria-label="Delete"
                >
                  <span className="text-xl font-bold">X</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
