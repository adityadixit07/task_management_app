// "use client";
// import React, { useState } from "react";
// import { Task, Tasks, ColumnId } from "../types";

// interface NewTaskFormProps {
//   columnId: ColumnId;
//   setTasks: React.Dispatch<React.SetStateAction<Tasks>>;
// }

// const TaskForm: React.FC<NewTaskFormProps> = ({ columnId, setTasks }) => {
//   const [newTask, setNewTask] = useState<Omit<Task, "id">>({
//     title: "",
//     description: "",
//     status: columnId,
//     priority: "Medium",
//     deadline: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newTask.title) {
//       setTasks((prevTasks) => {
//         const newTasks = { ...prevTasks };
//         newTasks[columnId] = [
//           ...newTasks[columnId],
//           { ...newTask, id: Date.now().toString() },
//         ];
//         return newTasks;
//       });
//       setNewTask({
//         title: "",
//         description: "",
//         status: columnId,
//         priority: "Medium",
//         deadline: "",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Task title"
//         value={newTask.title}
//         onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={newTask.description}
//         onChange={(e) =>
//           setNewTask({ ...newTask, description: e.target.value })
//         }
//       />
//       <select
//         value={newTask.priority}
//         onChange={(e) =>
//           setNewTask({
//             ...newTask,
//             priority: e.target.value as Task["priority"],
//           })
//         }
//       >
//         <option value="Low">Low</option>
//         <option value="Medium">Medium</option>
//         <option value="Urgent">Urgent</option>
//       </select>
//       <input
//         type="date"
//         value={newTask.deadline}
//         onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
//       />
//       <button type="submit">Add Task</button>
//     </form>
//   );
// };

// export default TaskForm;

"use client";
import React, { useState } from "react";
import { Task, Tasks, ColumnId } from "../types";

interface NewTaskFormProps {
  columnId: ColumnId;
  setTasks: React.Dispatch<React.SetStateAction<Tasks>>;
}

const TaskForm: React.FC<NewTaskFormProps> = ({ columnId, setTasks }) => {
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: columnId,
    priority: "Medium",
    deadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title) {
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        newTasks[columnId] = [
          ...newTasks[columnId],
          { ...newTask, id: Date.now().toString() },
        ];
        return newTasks;
      });
      setNewTask({
        title: "",
        description: "",
        status: columnId,
        priority: "Medium",
        deadline: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Task title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        required
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <select
        value={newTask.priority}
        onChange={(e) =>
          setNewTask({
            ...newTask,
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
        value={newTask.deadline}
        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
