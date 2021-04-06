const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');

const dotenv = require('dotenv');
dotenv.config({path:"./config/keys.env"});

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "main",
  }));


app.set("view engine", ".hbs");

app.use(express.static(__dirname + "/public"));


app.get("/headers", (req, res) => {
  const headers = req.headers;
  res.send(headers);
});


// Set up express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Load Controllers
const generalController = require("./controllers/general");
app.use("/", generalController);
const userController = require("./controllers/user");
app.use("/user", userController);
const customerController = require("./controllers/customer");
app.use("/dashboard/customer", customerController);
const clerkController = require("./controllers/clerk");
app.use("/dashboard/clerk", clerkController);


// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));


// call this function after the http server starts listening for requests
var PORT = process.env.PORT;

function onHttpStart() {
  console.log(`Web Server is up and running, port ${PORT}`);
}

// setup http server to listen on HTTP_PORT
app.listen(PORT, onHttpStart);


// Connect to the MongoDb
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
    console.log("Connected to the MongoDB database.");
})
.catch((err) => {
    console.log(`There was a problem connecting to the MongoDB...${err}`)
});





