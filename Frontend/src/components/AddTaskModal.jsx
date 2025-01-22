import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./../confiq/socket";
import {createTask} from "../api/api"
import { toast } from "react-toastify";
const AddTaskModal = ({ FetchTasks }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending");
  const addTask = async () => {
    try {
      const res = await createTask({
        name,
        status,
      });
      if (res.data) {
        socket.emit("tasklist", { name, status });
      }
      setName("");
      setStatus("Pending");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <div className="mt-4 p-4 border rounded shadow-lg bg-white">
    <h2 className="text-lg font-bold mb-4 text-gray-800">Add New Task</h2>
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        className="border p-3 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-all"
      >
        Add Task
      </button>
    </div>
  </div>
  
  );
};

export default AddTaskModal;
