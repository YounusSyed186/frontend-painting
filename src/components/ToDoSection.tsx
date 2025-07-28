import React from "react";

interface Task {
  _id: string;
  title?: string;
  description?: string;
}

interface ToDoSectionProps {
  tasks: Task[];
}

const ToDoSection: React.FC<ToDoSectionProps> = ({ tasks }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">To-Do Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        <ul className="list-disc ml-6 space-y-2">
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title || "Task"}</strong> – {task.description || "No description"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoSection;
