const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const app = express();

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

// Load Controllers
const generalController = require("./controllers/general");
app.use("/", generalController);
const signInController = require("./controllers/signinController");
app.use("/", signInController);
const registrationController = require("./controllers/registrationController");
const { Mongoose } = require("mongoose");
const { stringify } = require("querystring");
app.use("/", registrationController);

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
Mongoose.connect("mongodb+srv://acksaren:Programmer2021@web322cluster.ashtc.mongodb.net/web322db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  }
);

// Define our Models (NEEDS WORK)
const Schema = mongoose.Schema;

const NameSchema = new Schema({
    "nickname": {
        "type": String,
        "unique": true
    },
    "firstName": String,
    "ame": String,
    "age": {
        "type": Number,
        "default": 25
    }
});

var NameModel = mongoose.model("names", NameSchema);




