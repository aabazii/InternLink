const express = require('express');
const path = require('path');
const redditData = require('./data.json');
const port = 8080;
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');





// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
//app.use(bodyParser.urlencoded({ extended: true }));

//Connect to MongoDB (Note: We'll set up MongoDB later) Marios --v
const dbURI = "mongodb://localhost:27017/intern";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

  const IntershipsSchema = new mongoose.Schema({
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

const Internships = mongoose.model('interships', IntershipsSchema);


// const UsersSchema = new mongoose.Schema({
//  firstName:{
//   type:String,
//   required:true
//  },

//  lastName:{
//   type:String,
//   required:true
//  },

//  userEmail:{
//   type:String,
//   required:true
//  },

//  phoneNumber:{
//   type:String, //Check this out later
//   required:true
//  },

//  universityName:{
//   type:String,
//   required:true
//  },

//  dateOfBirth:{
//   type:date,
//   requred:true
//  }




// });

//const Users = mongoose.model('users', UsersSchema);


// const CompanySchema = new mongoose.Schema({
//   companyName:{
//     type:String,
//     required:true
//    },

//    companyPhoneNumber:{
//     type:phone,
//     required:true
//    },

//    companyEmail:{
//     type:String, //Check Later this one
//     required:true
//    },

//    companyLocation:{
    
//    }

// })

//const Company = mongoose.model('company', CompanySchema);


app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
})

app.get('/nav', (req,res) => {

  res.render("navbar");
  
})

app.get('/r/about', (req,res) => {

  res.render("subreddit");
})

app.get('/r/', (req, res) => {
  const {subreddit} = req.params;
  const data = redditData[subreddit];
  res.render("subreddit", { ...data });
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.send("<h1>404</h1>");
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ` + port);
});



