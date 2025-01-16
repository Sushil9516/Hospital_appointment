const express = require("express");
const Appointment = require("../models/Appointment");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Book Appointment
router.post("/book", protect, async (req, res) => {
  // console.log("Request body:", req.body);

  const { doctor, patient, date, time } = req.body;

  if (!doctor || !patient || !date || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const appointment = new Appointment({ doctor, patient, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(400).json({ message: "Error booking appointment" });
  }
});

// Get Appointments
router.get("/appointments", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor")
      .populate("patient");
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: "Error fetching appointments" });
  }
});

// Cancel Appointment
router.delete("/appointments/:id", protect, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(400).json({ message: "Error cancelling appointment" });
  }
});

module.exports = router;
