const express = require('express');
const path = require('path');
const redditData = require('./data.json');
const port = 8080;
const app = express();
const mongoose = require("mongoose");


// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB (Note: We'll set up MongoDB later)
const dbURI = "mongodb://localhost:27017/interships";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

  const intershipsSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    details:{
        type:String,
        required: true
    },
    internType:{
        type:String,
        required: true
    },
    payment:{
      type:String,
      required: true
    },
    deadline:{
      type:Date,
      required: true
    },
    location:{
      type:String,
      required: true
    }

    

    
})

const internships = mongoose.model('interships', intershipsSchema);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const subredditNames = Object.keys(redditData);
  console.log(subredditNames);
  res.render("home", { subredditNames });
});

app.get('/r/:subreddit', (req, res) => {
  const {subreddit} = req.params;
  const data = redditData[subreddit];
  //res.render("subreddit", { ...data });
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.send("<h1>404</h1>");
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ` + port);
});


