import { memo } from 'react';
import { Link } from 'react-router';
 
export const TaskItem = memo(function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li className={task.done ? 'done' : ''}>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      <span><Link to={'/tasks/' + task.id}>{task.text}</Link></span>
      <button type="button" aria-label="Удалить" onClick={() => onRemove(task.id)}>×</button>
    </li>
  );
});
