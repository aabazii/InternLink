const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const internshipRoutes = require("./routes/internshipRoutes");

const app = express();

// Middleware
app.use(express.json());

// Database connection
mongoose.connect("mongodb://localhost:27017/interships", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/internships", internshipRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});