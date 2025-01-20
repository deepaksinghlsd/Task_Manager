// import React, { useEffect, useState } from "react";
// import { fetchTasks } from "../api/api";

// const TaskTable = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const getTasks = async () => {
//       const { data } = await fetchTasks();
//       setTasks(data);
//     };

//     getTasks();
//   }, []);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Status</th>
//           <th>Created At</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tasks.map((task) => (
//           <tr key={task.id}>
//             <td>{task.id}</td>
//             <td>{task.name}</td>
//             <td>{task.status}</td>
//             <td>{task.created_at}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TaskTable;

import React from "react";
import axios from "axios";
import socket from "../confiq/socket";

const TaskTable = ({ tasks}) => {
  const updateStatus = async (id, status,index) => {
    try {
      await axios.put(`http://localhost:3500/tasks/${id}`, { status });
      socket.emit("task_update", { id: index, field: status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteTask = async (id,index) => {
    try {
      await axios.delete(`http://localhost:3500/tasks/${id}`);
      socket.emit("task_remove", index);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <table className="table-auto w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Task ID</th>
          <th className="px-4 py-2">Task Name</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index} className="text-center">
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{task.name}</td>
            <td className="border px-4 py-2">
              <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value,index+1)}
                className="border rounded p-1"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td className="border px-4 py-2">
              <button
                onClick={() => deleteTask(task.id,index+1)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
