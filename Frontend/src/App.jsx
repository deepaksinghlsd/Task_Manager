// import TaskTable from "./components/TaskTable";
// import AddTaskModal from "./components/AddTaskModal";
// import { useEffect, useState } from "react";
// const App = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     const response = await axios.get('http://localhost:3500/tasks');
//     setTasks(response.data);
//   };

//   return (
//     <div className="app-container">
//       <h1>Task Management Dashboard</h1>
//       <TaskTable tasks={tasks} />
//       <AddTaskModal fetchTasks={fetchTasks} />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import TaskTable from "./components/TaskTable";
import AddTaskModal from "./components/AddTaskModal";
import useSocket from "../hooks/Notification_hook";
const socket = io("http://localhost:3500");
const App = () => {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3500/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useSocket(fetchTasks)
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">
        Task Management Dashboard
      </h1>
      <TaskTable tasks={tasks} fetchTasks={fetchTasks} />
      <AddTaskModal fetchTasks={fetchTasks} />
      <ToastContainer />
    </div>
  );
};

export default App;
