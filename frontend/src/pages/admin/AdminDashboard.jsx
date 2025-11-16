import { Link } from 'react-router-dom';
import { useCafeData } from '../../hooks/useCafeData.js';

const SECTION_LABELS = {
  top: 'トップ',
  access: 'アクセス',
  reservations: '予約',
  gallery: 'ギャラリー',
  about: 'ストーリー',
  features: 'ハイライト',
};

const QUICK_ACTIONS = [
  { to: '/admin/gallery', label: 'ギャラリー管理' },
  { to: '/admin/highlights', label: 'ハイライト管理' },
  { to: '/admin/announcements', label: 'お知らせ管理' },
];

export default function AdminDashboard() {
  const { contents, features, gallery, announcements } = useCafeData();

  const stats = [
    { label: 'ギャラリー登録数', value: gallery.length },
    { label: 'ハイライト登録数', value: features.length },
    { label: 'お知らせ件数', value: announcements.length },
  ];

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h1>ダッシュボード</h1>
        <p>管理画面から公式サイトのコンテンツを更新できます。</p>
      </header>
      <div className="stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <span className="label">{stat.label}</span>
            <span className="value">{stat.value}</span>
          </article>
        ))}
      </div>
      <section className="content-section">
        <h2>ページコンテンツ</h2>
        <div className="content-grid">
          {Object.entries(contents).map(([sectionKey, content]) => (
            <article key={sectionKey} className="content-card">
              <h3>{SECTION_LABELS[sectionKey] ?? sectionKey}</h3>
              <p className="content-summary">
                {content?.title} — {content?.subtitle}
              </p>
              <Link className="btn-outline" to={`/admin/content/${sectionKey}`}>
                編集
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section">
        <h2>クイックアクション</h2>
        <div className="quick-actions">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.to} to={action.to} className="btn-primary">
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
