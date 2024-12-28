import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Check, X, Plus, MenuIcon } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  useEffect(() => {
    document.title = `Todo App (${tasks.length})`;
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        createdAt: new Date(),
      },
    ]);
    setNewTask({ title: '', description: '' });
    setIsDescriptionOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setNewTask({ title: task.title, description: task.description });
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...newTask } : task
      )
    );
    setEditingId(null);
    setNewTask({ title: '', description: '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewTask({ title: '', description: '' });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{
        backgroundImage: "url('/todo.jpg')", // Path to your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(50, 50, 50, 0.6)', // Dark gray overlay
      }}
    >
      <div className="w-full max-w-lg bg-gradient-to-t from-gray-600 to-gray-400 p-8 rounded-xl shadow-lg absolute right-56 top-1/2 transform -translate-y-1/2">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Task Master</h1>

        {/* Add Task Section */}
        <div className="mb-8">
          <div className="flex gap-3 mb-2">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="flex-1 px-4 py-2 rounded-lg bg-white/30 text-gray-900 placeholder-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="What needs to be done?"
            />
            <button
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              className="p-2 rounded-lg bg-gray-500/70 hover:bg-gray-500/90 text-white transition-colors"
            >
              <MenuIcon size={24} />
            </button>
            <button
              onClick={addTask}
              className="p-2 rounded-lg bg-gray-700/70 hover:bg-gray-700/90 text-white transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>

          {isDescriptionOpen && (
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-gray-900 placeholder-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 mt-2"
              placeholder="Add description (optional)"
              rows="3"
            />
          )}
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white/20 rounded-lg p-4 transition-all ${task.completed ? 'opacity-60' : ''}`}
            >
              {editingId === task.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/30 text-gray-900 placeholder-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/30 text-gray-900 placeholder-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    rows="3"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="p-2 rounded-lg bg-gray-800/70 hover:bg-gray-800/90 text-white transition-colors"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 rounded-lg bg-purple-700/70 hover:bg-purple-700/90 text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="w-5 h-5 rounded border-gray-600"
                    />
                    <h3
                      className={`flex-1 text-white text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}
                    >
                      {task.title}
                    </h3>
                    <button
                      onClick={() => startEditing(task)}
                      className="p-2 rounded-lg hover:bg-purple-500/30 text-white transition-colors"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 rounded-lg hover:bg-gray-500/30 text-white transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  {task.description && (
                    <div className="mt-2 ml-9 p-3 bg-gray-500/30 rounded-lg">
                      <p className="text-white/90 text-sm">{task.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
