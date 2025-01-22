
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskTable from "./components/TaskTable";
import AddTaskModal from "./components/AddTaskModal";
import useSocket from "./hooks/Notification_hook";
import {fetcTasks} from "./api/api"
const App = () => {
  const [tasks, setTasks] = useState([]);
  const FetchTasks = async () => {
    try {
      const response = await fetcTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useSocket(FetchTasks)
  useEffect(() => {
    FetchTasks();
  }, []);

  return (
    <div className="app-container p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">
        Task Management Dashboard
      </h1>
      <AddTaskModal FetchTasks={FetchTasks} />
      <TaskTable tasks={tasks} FetchTasks={FetchTasks} />
      <ToastContainer />
    </div>
  );
};

export default App;
