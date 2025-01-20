import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3500"; // Replace with your server URL

const socket = io(SOCKET_URL, {
  autoConnect: true, // Automatically connect when initialized
  transports: ["websocket", "polling"], 
});

export default socket 