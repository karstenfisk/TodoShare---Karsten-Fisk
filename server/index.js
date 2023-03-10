const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT;

const notes = require("./api/notes");
const users = require("./api/users");

const app = express();

app.use(cors());
app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Parser to send cookies to be used for auth
app.use(cookieParser());

// Api routes
app.use("/api/users", users);
app.use("/api/notes", notes);

app.get("/", (req, res, next) => {
  res.send("Todo Api");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(404).send("The page you are looking for could not be found");
  } else {
    res.status(err.status || 500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
