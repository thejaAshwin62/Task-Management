import React from "react";

const PriorityBadge = ({ priority }) => {
  const badges = {
    1: { color: "badge-info", text: "🔵 Low" },
    2: { color: "badge-warning", text: "🟡 Medium" },
    3: { color: "badge-error", text: "🔴 High" },
  };

  const { color, text } = badges[priority];
  return <span className={`badge ${color} gap-1`}>{text}</span>;
};

function TaskList({ tasks, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <div className="card bg-base-100 p-8 text-center animate-fade-in">
        <p className="text-base-content/60">
          No tasks found. Add some tasks to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`card bg-base-100 shadow-sm hover:shadow-md transition-all duration-200 animate-slide-in ${
            task.completed ? "opacity-70" : ""
          }`}
        >
          <div className="card-body p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  className="checkbox checkbox-primary"
                />
                <span
                  className={`text-base-content text-lg ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </span>
                <PriorityBadge priority={task.priority} />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-base-content/60">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onDelete(task.id)}
                  className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                  aria-label="Delete task"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
