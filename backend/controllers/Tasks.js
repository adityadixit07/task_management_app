import Task from "../models/Task.js";

class Tasks {
  // Get all tasks
  static getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user._id });

      res.status(200).json({ tasks: tasks, success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to load the tasks", success: false });
    }
  };

  // Create task
  static createTask = async (req, res) => {
    try {
      const { title, description, status, priority, deadline } = req.body;
      console.log(req.user);
      if (!title) {
        return res
          .status(400)
          .json({ message: "Title is required", success: false });
      }
      if (!status) {
        return res
          .status(400)
          .json({ message: "Status is required", success: false });
      }
      const task = new Task({
        title,
        description,
        status,
        priority,
        deadline,
        user: req.user,
      });
      await task.save();
      res.status(201).json({ task, success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to create the task",
        success: false,
      });
    }
  };

  // Update task
  static updateTask = async (req, res) => {
    try {
      const { title, description, status, priority, deadline } = req.body;
      if (!title || title.trim() === "") {
        return res
          .status(400)
          .json({ message: "Title is required", success: false });
      }
      if (!status || status.trim() === "") {
        return res
          .status(400)
          .json({ message: "Status is required", success: false });
      }
      const task = {};
      if (title) task.title = title;
      if (description) task.description = description;
      if (status) task.status = status;
      if (priority) task.priority = priority;
      if (deadline) task.deadline = deadline;
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, task, {
        new: true,
      });
      res.status(200).json({ task: updatedTask, success: true });
    } catch (error) {
      return res.status(500).json({
        message: "Unable to update the task",
        success: false,
      });
    }
  };

  // Delete task
  static deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res
          .status(404)
          .json({ message: "Task not found", success: false });
      }
      await task.remove();
      res
        .status(200)
        .json({ message: "Task deleted successfully", success: true });
    } catch (error) {
      return res.status(500).json({
        message: "Unable to delete the task",
        success: false,
      });
    }
  };
}

export default Tasks;
