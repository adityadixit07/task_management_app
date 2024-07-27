import express from "express";
import Tasks from "../controllers/Tasks.js";
import auth from "../middlewares/auth.js";

const taskRoute = express.Router();

taskRoute.route("/").get(auth, Tasks.getAllTasks);
taskRoute.route("/create").post(auth, Tasks.createTask);
taskRoute.route("/update/:id").put(auth, Tasks.updateTask);
taskRoute.route("/delete/:id").delete(auth, Tasks.deleteTask);

export default taskRoute;
