import { toast } from "react-toastify";
import socket from "../confiq/socket";
import { useEffect } from "react";
const useSocket = (fetchTasks) => {
  const task_notification = (data) => {
    toast.success(data);
    fetchTasks();
  };
  useEffect(() => {
    socket.on("get_notification", task_notification);
    return () => {
      socket.off("get_notification", task_notification);
    };
  }, []);
};
export default useSocket;
