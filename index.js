require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const companyRoutes = require("./routes/companyRoutes");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const multer = require("multer");
const methodOverride = require("method-override");

//cookieParser
const cookieParser = require("cookie-parser");
const Internship = require("./models/Internship");
const { InternshipController } = require("./controllers/internshipController");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({ secret: "my secret key", saveUninitialized: true, resave: false })
);

//store authenticated user's session data for views
app.use(function (req, res, next) {
  res.locals.user = req.session.user || null;
  next();
});

//store authenticated companies' session data for views
app.use(function (req, res, next) {
  res.locals.company = req.session.company || null;
  next();
});
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Database connection
mongoose
  .connect("mongodb://localhost:27017/internships", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Method override middleware
app.use(methodOverride("_method"));

// Routes
app.use("/users", userRoutes);
app.use("/internships", internshipRoutes);
app.use("/company", companyRoutes);
app.use("/", authRoutes);

app.get("/", async (req, res) => {
  const internships = await Internship.find();
  res.render("index", { internships, currentPage: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", { currentPage: "about" });
});

app.get("/pages", (req, res) => {
  res.render("services", { currentPage: "pages" });
});


app.get("/single/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).send("Internship not found");
    }
    res.render("job-single", { internship });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio", { currentPage: "portfolio" });
});
app.get("/faq", (req, res) => {
  res.render("faq", { currentPage: "faq" });
});
app.get("/testimonials", (req, res) => {
  res.render("testimonials", { currentPage: "testimonials" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { currentPage: "contact" });
});


//app.get("/listing", InternshipController.searchInternships);


app.get("/", InternshipController.searchInternships);

app.get("/single", (req, res) => {
  res.render("job-single");
});

//Necessary cookies

// Set a session cookie
app.get("/login", (req, res) => {
  res.cookie("sessionToken", "unique-session-id", {
    httpOnly: true, // Prevents JavaScript access
    secure: true, // Ensures HTTPS usage
    sameSite: "Strict", // Prevents cross-site requests
    maxAge: 36000000, // Expires in 1 hour
  });
  res.send("Session cookie set.");
});

// Check session cookie
app.get("/check-session", (req, res) => {
  const token = req.cookies.sessionToken;
  if (token) {
    res.send(`Session token: ${token}`);
  } else {
    res.send("No session token found.");
  }
});

// Clear session cookie on logout
app.get("/logout", (req, res) => {
  res.clearCookie("sessionToken");
  res.send("Session token cleared.");
});

// Example: Read a cookie
app.get("/check-theme", (req, res) => {
  const theme = req.cookies.siteTheme;
  if (theme) {
    res.send(`Your site theme is: ${theme}`);
  } else {
    res.send("No theme cookie found.");
  }
});

// Example: Clear a cookie
app.get("/clear-theme", (req, res) => {
  res.clearCookie("siteTheme");
  res.send("Theme cookie cleared.");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// document.querySelectorAll('.form-check-input').forEach((radio) => {
//   radio.addEventListener('change', function () {
//       // Get the label of the selected radio button
//       const selectedText = this.nextElementSibling.textContent.trim();

//       // Update the dropdown button text
//       const dropdownButton = document.getElementById('dropdownCity');
//       dropdownButton.textContent = selectedText;
//   });
// });
