
import React from "react";
import axios from "axios";
import socket from "../confiq/socket";
import{updateTask , deleteTask} from "../api/api"

const TaskTable = ({ tasks}) => {
  const updateStatus = async (id, status,index) => {
    try {
      await updateTask(id ,status)
      socket.emit("task_update", { id: index, field: status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const DeleteTask = async (id,index) => {
    try {
      deleteTask(id);
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
                onClick={() => DeleteTask(task.id,index+1)}
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
