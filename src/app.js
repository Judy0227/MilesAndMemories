// mongodb
require("./config/db");
const path = require("path");

const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const routes = require("./routes");

// create app
const app = express();

app.use(cors());
app.use(bodyParser());
app.use("/api/v1", routes);
app.set('views', [
  path.join(__dirname, 'user', 'views'),
  path.join(__dirname, 'journal', 'views'),
]);
app.set('view engine', 'ejs');


module.exports = app;