import { useState } from 'react';
import { useCafeData } from '../../hooks/useCafeData.js';
import { useCmsData } from '../../context/CmsDataContext.jsx';

const ICON_HINT = '例: fa-leaf / fa-mug-hot / fa-music';

export default function AdminFeatures() {
  const { features } = useCafeData();
  const { addFeature, deleteFeature } = useCmsData();
  const [formState, setFormState] = useState({ title: '', description: '', icon: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addFeature({
      title: formState.title.trim(),
      description: formState.description.trim(),
      icon: formState.icon.trim() || 'fa-mug-hot',
    });
    setFormState({ title: '', description: '', icon: '' });
    setStatus({ type: 'success', message: 'ハイライトを追加しました。' });
  };

  const handleDelete = (featureId) => {
    deleteFeature(featureId);
    setStatus({ type: 'info', message: 'カードを削除しました。' });
  };

  return (
    <section className="form-section">
      <header>
        <h1>ハイライト管理</h1>
        <p>紹介したい魅力ポイントを追加・削除できます。</p>
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
          説明
          <textarea name="description" rows="3" value={formState.description} onChange={handleChange} required />
        </label>
        <label>
          アイコン（Font Awesome）
          <input name="icon" value={formState.icon} onChange={handleChange} placeholder={ICON_HINT} />
        </label>
        <button type="submit" className="btn-primary">
          追加
        </button>
      </form>
      <div className="feature-admin-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-admin-item">
            <i className={`fas ${feature.icon}`} aria-hidden="true" />
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
            <button type="button" className="btn-outline" onClick={() => handleDelete(feature.id)}>
              削除
            </button>
          </div>
        ))}
        {features.length === 0 ? <p className="empty-hint">カードがまだありません。</p> : null}
      </div>
    </section>
  );
}
