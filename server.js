//Require dotenv
require("dotenv").config();

//Modules
const express = require("express"); //Require Express
const app = express(); //Express Router
const Port = process.env.PORT; //Require Port No. from dotenv
const bodyParser = require("body-parser"); //Require Body Parser
const cors = require("cors"); //Require Cors

//Middleware Connections
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// // CORS HEADERS MIDDLEWARE
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*'); //http://localhost:3000,
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT,PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

//Require Database
const database = require("./backend/config/database");
database.connect();



//Require Routes
const routes = require("./backend/routes/routes");
app.use("/", routes);

// API
app.get("/", (req, res) => {
  res.json({
    Status: "200",
    Message: "API is Working.."
  });
});

//Port Connection
app.listen(Port, () => {
  console.log(`Server is running on ${Port} port.`);
});
