const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const router = require("./routes/tasks");
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "*" }));
app.use("/tasks", router);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://calm-dusk-70ffec.netlify.app/", // Allow frontend origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
  },
});
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);
  socket.on("tasklist", (data) => {
    io.emit("get_notification", "new task added");
  });
  socket.on("task_remove", (id) => {
    io.emit("get_notification", `${id} no task removed `);
  });
  socket.on("task_update", (data) => {
    io.emit("get_notification", `Task number ${data.id} has been updated in the ${data.field} mode.`);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost: ${PORT}`);
});
