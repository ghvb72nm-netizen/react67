import { NavLink, Outlet } from 'react-router';
import { useOnlineStatus } from '../hooks/useOnlineStatus.js';
import { ThemeToggle } from './ThemeToggle.jsx';

export default function Layout() {
  const online = useOnlineStatus();

  return (
    <div className="app">
      <header className="top">
        <h1>Менеджер задач</h1>
        <ThemeToggle />
      </header>

      <nav className="nav">
        <NavLink to="/" end>Задачи</NavLink>
        <NavLink to="/about">О приложении</NavLink>
      </nav>

      <p className="muted">{online ? '🟢 Онлайн' : '🔴 Нет сети'}</p>

      <Outlet />
    </div>
  );
}
