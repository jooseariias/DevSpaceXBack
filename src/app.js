const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const routes = require("./routes/index.js");

const auth = require("./routes/AuthGoogle.js");
const categories = require("./routes/Categories.js");
const Question = require("./routes/Questions.js")
const Answer = require("./routes/Answer.js")

require("./db.js");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

server.use(bodyParser.json({ limit: "50mb" }));

server.use(cookieParser());

server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/api", auth, categories,Question,Answer);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
