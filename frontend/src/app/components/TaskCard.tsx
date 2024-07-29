"use client";
import React, { useState } from "react";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Task, Tasks } from "../types";

interface TaskCardProps {
  task: Task;
  provided: DraggableProvided;
  setTasks: React.Dispatch<React.SetStateAction<Tasks>>;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, provided, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    // Add save logic here
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Add delete logic here
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-white rounded-lg shadow-lg p-4"
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Task Title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Task Description"
          />
          <select
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                priority: e.target.value as Task["priority"],
              })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Urgent">Urgent</option>
          </select>
          <input
            type="date"
            value={editedTask.deadline}
            onChange={(e) =>
              setEditedTask({ ...editedTask, deadline: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          <p className="text-sm mt-2">
            <span className="font-medium">Priority: </span>
            {task.priority}
          </p>
          <p className="text-sm">
            <span className="font-medium">Deadline: </span>
            {task.deadline}
          </p>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handleEdit}
              className="text-blue-500 text-sm hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
