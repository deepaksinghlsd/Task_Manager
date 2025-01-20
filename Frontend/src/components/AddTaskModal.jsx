// import React, { useState } from "react";
// import { createTask } from "../api/api";

// const AddTaskModal = ({ onClose }) => {
//   const [name, setName] = useState("");
//   const [status, setStatus] = useState("Pending");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createTask({ name, status });
//     onClose();
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Task Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <select value={status} onChange={(e) => setStatus(e.target.value)}>
//           <option value="Pending">Pending</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Completed">Completed</option>
//         </select>
//         <button type="submit">Add Task</button>
//       </form>
//     </div>
//   );
// };

// export default AddTaskModal;

import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "./../confiq/socket";
import { toast } from "react-toastify";
const AddTaskModal = ({ fetchTasks }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending");
  const addTask = async () => {
    try {
      const res = await axios.post("http://localhost:3500/tasks", {
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
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Add New Task</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task Name"
          className="border p-2 rounded w-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTaskModal;
