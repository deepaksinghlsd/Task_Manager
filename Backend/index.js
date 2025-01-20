const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const router = require("./routes/tasks");
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies

app.use(cors({ origin: "http://localhost:5173" }));
app.use("/tasks", router);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend origin
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
server.listen(3500, () => {
  console.log("Server is running on http://localhost:3000");
});
