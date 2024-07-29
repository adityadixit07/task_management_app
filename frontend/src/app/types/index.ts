export interface Task {
  id: string;
  title: string;
  description: string;
  status: ColumnId;
  priority: "Low" | "Medium" | "Urgent";
  deadline: string;
}

export type ColumnId = "To-Do" | "In Progress" | "Under Review" | "Completed";

export type Tasks = {
  [key in ColumnId]: Task[];
};
