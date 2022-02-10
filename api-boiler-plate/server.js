require("./db/connection");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dateFormat = require("dateformat");

const path = require("path");
const {
  emit
} = require("process");
const app = express();
require("dotenv").config();

// app.use(fileUpload());
app.use(cors({
  exposedHeaders: ['admin-authorization']
}));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
const REACT_APP_ENV = process.env.REACT_APP_ENV;
app.use(express.static(path.join(__dirname, "build")));

//Log api requests
app.use((req, res, next) => {
  console.log("Time:", dateFormat(), req.method, req.originalUrl);
  next();
});

/* Middleware: Log Errors */
app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

const api = {
  admin: require("./api/routes/admin"),
};

app.use("/api", api.admin);

app.post("/payment/redirect", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "payment-redirect.html"));
});



app.get("/*", function (req, res) {
  res.status(200).send({
    status: 200
  });
});

const server = app.listen(PORT, async function () {
  console.log("Server listening on port " + PORT);
});