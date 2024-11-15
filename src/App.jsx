import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import SearchBar from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import { loadTasks, saveTasks } from './utils/storage'

function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')

  const addTask = (title, priority) => {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    const updatedTasks = [newTask, ...tasks]
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
    toast.success('Task added successfully!')
  }

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const deleteAllTasks = () => {
    toast((t) => (
      <div className="flex items-center gap-4">
        <span>Delete all tasks?</span>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setTasks([]);
              toast.dismiss(t.id);
              toast.success('All tasks deleted!');
            }}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-ghost btn-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center',
      className: 'bg-base-200 text-base-content',
    });
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return b.priority - a.priority
      case 'name':
        return a.title.localeCompare(b.title)
      default: // date
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  return (
    <div className="min-h-screen bg-base-200 transition-all duration-300">
      <Toaster />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary">Task Manager</h1>
            <div className="flex gap-4 items-center">
              {tasks.length > 0 && (
                <button
                  onClick={deleteAllTasks}
                  className="btn btn-error btn-outline gap-2 hover:scale-105 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete All
                </button>
              )}
              <ThemeToggle />
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <TaskInput onAddTask={addTask} />
              <SearchBar 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
              <TaskList 
                tasks={sortedTasks}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
