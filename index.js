require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const userRoutes = require("./routes/userRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const companyRoutes = require("./routes/companyRoutes");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");

//cookieParser
const cookieParser = require("cookie-parser");
const Internship = require("./models/Internship");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);


app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//store authenticated user's session data for views
app.use(function(req, res, next){
  res.locals.user = req.session.user || null;
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

// Routes
//app.use("", require("./routes/userRoutes"));
app.use("/users", userRoutes);
app.use("/internships", internshipRoutes);
app.use("/companies", companyRoutes);
app.use("/", authRoutes);

app.get("/", async (req, res) => {
  res.cookie("siteTheme", "dark", {
    maxAge: 3600000,
    httpOnly: true,
    secure: true,
  });
  const internships = await Internship.find();
  res.render("index", {internships});
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/pages", (req, res) => {
  res.render("services");
});
app.get("/services", (req, res) => {
  res.render("services");
});
app.get("/services-single", (req, res) => {
  res.render("services-single");
});
app.get("/single", (req, res) => {
  res.render("services");
});
// Render the form to add a new internship
app.get("/post", (req, res) => {
  res.render("post-job");
});

app.get("/listing", (req, res) => {
  res.render("job-listings");
});

app.get("/single", (req, res) => {
  res.render("job-single");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});


//Necessary cookies

// Set a session cookie
app.get("/login", (req, res) => {
  res.cookie("sessionToken", "unique-session-id", {
    httpOnly: true, // Prevents JavaScript access
    secure: true, // Ensures HTTPS usage
    sameSite: "Strict", // Prevents cross-site requests
    maxAge: 3600000, // Expires in 1 hour
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
