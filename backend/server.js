const express = require("express");
const connectDatabase = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

connectDatabase();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
