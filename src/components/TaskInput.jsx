import { useState } from "react";
import { toast } from 'react-hot-toast'

export default function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddTask(title.trim(), priority);
      setTitle("");
      setPriority(2);
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-200 shadow-sm mb-6 transition-all duration-300">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="input input-lg input-bordered w-full focus:input-primary transition-all duration-200"
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="form-control flex-1">
              <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="select select-bordered select-lg w-full"
                disabled={isSubmitting}
              >
                <option value={1}>🔵 Low Priority</option>
                <option value={2}>🟡 Medium Priority</option>
                <option value={3}>🔴 High Priority</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg gap-2 hover:scale-105 transition-all duration-200"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
              {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
