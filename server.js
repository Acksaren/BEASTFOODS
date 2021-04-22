<<<<<<< HEAD
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
<<<<<<< HEAD
const fileUpload = require('express-fileupload');
=======
>>>>>>> 5d55491a8997ad6db6b118013ce14506f1a2957d

const dotenv = require('dotenv');
dotenv.config({path:"./config/keys.env"});

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload());

// express-handlebars template engine
app.engine(".hbs", exphbs({
  extname: ".hbs",
  defaultLayout: "main",
  helpers: {
    if_eq(a, b, opts) {
      if(a == b)
        return opts.fn(this);
      else
        return opts.inverse(this);
    }
  }
}));

app.set("view engine", ".hbs");

app.use(express.static(__dirname + "/public"));

app.get("/headers", (req, res) => {
  const headers = req.headers;
  res.send(headers);
});

<<<<<<< HEAD
=======

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

>>>>>>> 5d55491a8997ad6db6b118013ce14506f1a2957d

// Set up express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(function (req, res, next) {
  req.session.cart = req.session.cart || {items: {}, total: 0};
  next();
});

<<<<<<< HEAD
=======
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





=======
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
>>>>>>> 5d55491a8997ad6db6b118013ce14506f1a2957d
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
<<<<<<< HEAD
const loadDataController = require("./controllers/loadData");
app.use('/load-data/meal-kits', loadDataController);
const shoppingCartController = require("./controllers/shoppingCart");
app.use('/shopping-cart', shoppingCartController);
=======


// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
>>>>>>> 5d55491a8997ad6db6b118013ce14506f1a2957d


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





<<<<<<< HEAD
=======
>>>>>>> 6b8975b7b18bbb6c480489982d208207aedf4cee
>>>>>>> 5d55491a8997ad6db6b118013ce14506f1a2957d
