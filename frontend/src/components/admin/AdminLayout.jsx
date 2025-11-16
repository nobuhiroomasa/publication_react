import { NavLink, Outlet } from 'react-router-dom';
import { useCmsData } from '../../context/CmsDataContext.jsx';

const NAV_ITEMS = [
  { to: '/admin', label: 'ダッシュボード', end: true },
  { to: '/admin/gallery', label: 'ギャラリー' },
  { to: '/admin/highlights', label: 'おすすめ' },
  { to: '/admin/announcements', label: 'お知らせ' },
];

export default function AdminLayout() {
  const { logout } = useCmsData();

  return (
    <div className="admin-root">
      <header className="admin-header">
        <div className="container">
          <div className="logo">Sample Cafe 管理画面</div>
          <nav>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
            <button type="button" className="btn-outline logout" onClick={logout}>
              ログアウト
            </button>
          </nav>
        </div>
      </header>
      <main className="admin-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="admin-footer">
        <div className="container">
          <p>
            本ページは「Sample Cafe」用のデモ管理コンソールです。<br />
            デフォルトログイン情報：ユーザー名 <code>admin</code> / パスワード <code>admin1234</code>
          </p>
        </div>
      </footer>
    </div>
  );
}
