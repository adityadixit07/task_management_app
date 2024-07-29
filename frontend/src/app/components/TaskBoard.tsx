"use client";
import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import NewTaskForm from "./TaskForm";
import { Task, Tasks, ColumnId } from "../types";
import { fetchTasks } from "../utils/api";

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks>({
    "To-Do": [],
    "In Progress": [],
    "Under Review": [],
    Completed: [],
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    getTasks();
  }, []);

  const onDragEnd = (result: DropResult) => {
    // Add your existing onDragEnd logic here
  };

  const getColumnColor = (columnId: ColumnId): string => {
    switch (columnId) {
      case "To-Do":
        return "bg-blue-100";
      case "In Progress":
        return "bg-yellow-100";
      case "Under Review":
        return "bg-purple-100";
      case "Completed":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Task Management Board
        </h1>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {(Object.keys(tasks) as ColumnId[]).map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`task-column flex-1 min-w-[250px] ${getColumnColor(
                    columnId
                  )} rounded-lg shadow-md p-4`}
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    {columnId}
                  </h2>
                  <NewTaskForm columnId={columnId} setTasks={setTasks} />
                  <div className="space-y-3 mt-4">
                    {tasks[columnId].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <TaskCard
                            task={task}
                            provided={provided}
                            setTasks={setTasks}
                          />
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
