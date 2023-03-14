const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT;

const notes = require("./api/notes");
const users = require("./api/users");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000" || process.env.CORS,
    credentials: true,
  })
);

app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

// Parser to send cookies to be used for auth
app.use(cookieParser());

io.on("connection", (socket) => {
  socket.on("makeRoom", ({ id }) => {
    socket.join(id);
  });
});

//Socket middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Api routes
app.use("/api/users", users);
app.use("/api/notes", notes);
app.get("/css/index.css", (req, res, next) => {
  const cssPath = path.join(__dirname, "..", "src", "index.css");
  res.sendFile(cssPath);
});

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(404).send("The page you are looking for could not be found");
  } else {
    res.status(err.status || 500).send(err);
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
