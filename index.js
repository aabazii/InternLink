const express = require('express');
const path = require('path');
const redditData = require('./data.json');
const port = 8080;
const app = express();

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
