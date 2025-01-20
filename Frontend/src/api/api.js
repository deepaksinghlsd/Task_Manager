import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3500" });

export const fetchTasks = () => API.get("/tasks");
export const createTask = (task) => API.post("/tasks", task);
export const updateTask = (id, status) => API.put(`/tasks/${id}`, { status });
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
