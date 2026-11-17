import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { tasksReducer } from './tasksReducer.js';

const TasksContext = createContext(null);

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem('tasks')) ?? [];
  } catch {
    return [];
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, [], loadTasks);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const value = useMemo(() => ({ tasks, dispatch }), [tasks]);
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks нужно вызывать внутри TasksProvider');
  return ctx;
}
