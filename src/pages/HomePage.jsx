import { useCallback, useDeferredValue, useMemo, useRef, useState, useTransition } from 'react';
import { useSearchParams } from 'react-router';
import { useTasks } from '../TasksContext.jsx';
import { AddTaskForm } from '../components/AddTaskForm.jsx';
import { SearchBox } from '../components/SearchBox.jsx';
import { TaskList } from '../components/TaskList.jsx';

const FILTERS = [
  ['all', 'Все'],
  ['active', 'Активные'],
  ['done', 'Готовые'],
];

export default function HomePage() {
  const { tasks, dispatch } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('filter');
  const filter = ['active', 'done'].includes(raw) ? raw : 'all';

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();
  const searchRef = useRef(null);

  function changeFilter(key) {
    startTransition(() => setSearchParams(key === 'all' ? {} : { filter: key }));
  }

  const handleAdd = useCallback((text) => {
    dispatch({ type: 'add', task: { id: Date.now(), text, done: false } });
  }, [dispatch]);
  const handleToggle = useCallback((id) => dispatch({ type: 'toggle', id }), [dispatch]);
  const handleRemove = useCallback((id) => dispatch({ type: 'remove', id }), [dispatch]);

  const visibleTasks = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return tasks.filter((t) => {
      const byFilter = filter === 'all' || (filter === 'done' ? t.done : !t.done);
      return byFilter && t.text.toLowerCase().includes(q);
    });
  }, [tasks, deferredQuery, filter]);

  const doneCount = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);

  return (
    <>
      <AddTaskForm onAdd={handleAdd} />

      <div className="row">
        <SearchBox ref={searchRef} value={query} onChange={setQuery} />
        <button type="button" onClick={() => searchRef.current.clear()}>Сбросить</button>
      </div>

      <div className="tabs">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={filter === key ? 'active' : ''}
            onClick={() => changeFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="muted">
        Всего: {tasks.length}, выполнено: {doneCount}
        {isPending && ' · обновляем…'}
      </p>

      <div className={isPending ? 'dim' : ''}>
        <TaskList tasks={visibleTasks} onToggle={handleToggle} onRemove={handleRemove} />
      </div>

      <div className="actions">
        <button type="button" onClick={() => dispatch({ type: 'clearDone' })}>Удалить выполненные</button>
        <button type="button" onClick={() => dispatch({ type: 'addMany', count: 2000 })}>+2000 тестовых</button>
        <button type="button" onClick={() => dispatch({ type: 'clearAll' })}>Удалить все</button>
      </div>
    </>
  );
}
