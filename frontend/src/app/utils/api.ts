import axios from "axios";
import { Task, Tasks } from "../types";
const API_BASE_URL = "http://localhost:5000";

export const fetchTasks = async (): Promise<Tasks> => {
  const response = await axios.get(`${API_BASE_URL}/api/1/tasks`);
  console.log(response, "response");
  return response.data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
};
