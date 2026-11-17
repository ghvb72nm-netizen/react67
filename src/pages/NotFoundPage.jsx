import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section>
      <h2>404 — страница не найдена</h2>
      <Link to="/">На главную</Link>
    </section>
  );
}
