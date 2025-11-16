import { useState } from 'react';
import { useCafeData } from '../../hooks/useCafeData.js';
import { useCmsData } from '../../context/CmsDataContext.jsx';

export default function AdminAnnouncements() {
  const { announcements } = useCafeData();
  const { addAnnouncement, deleteAnnouncement } = useCmsData();
  const [formState, setFormState] = useState({ title: '', content: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addAnnouncement({
      title: formState.title.trim(),
      content: formState.content.trim(),
    });
    setFormState({ title: '', content: '' });
    setStatus({ type: 'success', message: 'お知らせを追加しました。' });
  };

  const handleDelete = (id) => {
    deleteAnnouncement(id);
    setStatus({ type: 'info', message: 'お知らせを削除しました。' });
  };

  return (
    <section className="form-section">
      <header>
        <h1>お知らせ管理</h1>
        <p>キャンペーンや最新情報を追加してください。</p>
      </header>
      {status ? (
        <div className="flash-wrapper">
          <p className={`flash flash-${status.type}`}>{status.message}</p>
        </div>
      ) : null}
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          タイトル
          <input name="title" value={formState.title} onChange={handleChange} required />
        </label>
        <label>
          内容
          <textarea name="content" rows="3" value={formState.content} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn-primary">
          追加
        </button>
      </form>
      <div className="announcement-admin-list">
        {announcements.map((announcement) => (
          <article key={announcement.id}>
            <h3>{announcement.title}</h3>
            <time dateTime={announcement.published_at}>
              {announcement.published_at?.replace('T', ' ').slice(0, 16)}
            </time>
            <p>{announcement.content}</p>
            <div className="inline-form">
              <button type="button" className="btn-outline" onClick={() => handleDelete(announcement.id)}>
                削除
              </button>
            </div>
          </article>
        ))}
        {announcements.length === 0 ? <p className="empty-hint">お知らせはまだ登録されていません。</p> : null}
      </div>
    </section>
  );
}
