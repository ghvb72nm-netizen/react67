import { Link, useNavigate, useParams } from 'react-router';
import { useTasks } from '../TasksContext.jsx';

export default function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, dispatch } = useTasks();
  const task = tasks.find((t) => String(t.id) === id);

  if (!task) {
    return (
      <section>
        <p>Задача не найдена.</p>
        <Link to="/">← К списку</Link>
      </section>
    );
  }

  function handleRemove() {
    dispatch({ type: 'remove', id: task.id });
    navigate('/');
  }

  return (
    <section>
      <h2>{task.text}</h2>
      <p>Статус: {task.done ? 'выполнена' : 'не выполнена'}</p>
      <button type="button" onClick={() => dispatch({ type: 'toggle', id: task.id })}>
        {task.done ? 'Вернуть в работу' : 'Отметить выполненной'}
      </button>{' '}
      <button type="button" onClick={handleRemove}>Удалить</button>{' '}
      <button type="button" onClick={() => navigate(-1)}>Назад</button>
    </section>
  );
}
