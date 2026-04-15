require("dotenv").config();
const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");

const app = express();

app.use("/api/auth", require("./routes/authRoutes"));
// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/jobs", require("./routes/jobRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});