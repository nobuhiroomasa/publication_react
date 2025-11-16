import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCafeData } from '../../hooks/useCafeData.js';
import { useCmsData } from '../../context/CmsDataContext.jsx';

const SECTION_LABELS = {
  top: 'トップ',
  access: 'アクセス',
  reservations: '予約',
  about: 'ストーリー',
  features: 'ハイライト',
};

export default function AdminContentEditor() {
  const { section } = useParams();
  const navigate = useNavigate();
  const { contents } = useCafeData();
  const { updateContent } = useCmsData();
  const content = contents[section];
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState(() => createFormState(content));

  useEffect(() => {
    setFormState(createFormState(content));
  }, [content]);

  const sectionLabel = useMemo(() => SECTION_LABELS[section] ?? section?.toUpperCase() ?? 'CONTENT', [section]);

  if (!content) {
    return (
      <section className="form-section">
        <header>
          <h1>セクションが見つかりません</h1>
          <p>URL を確認して再度お試しください。</p>
        </header>
        <Link to="/admin" className="btn-outline">
          ダッシュボードへ戻る
        </Link>
      </section>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateContent(section, formState);
    setStatus({ type: 'success', message: 'コンテンツを保存しました。' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="form-section">
      <header>
        <h1>コンテンツ編集: {sectionLabel}</h1>
        <p>文章と画像URLを更新できます。デザインは固定されています。</p>
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
          サブタイトル
          <input name="subtitle" value={formState.subtitle} onChange={handleChange} />
        </label>
        <label>
          本文
          <textarea name="body" rows="6" value={formState.body} onChange={handleChange} />
        </label>
        <label>
          ハイライト
          <input name="highlight" value={formState.highlight} onChange={handleChange} />
        </label>
        <label>
          背景・画像URL
          <input name="image" value={formState.image} onChange={handleChange} />
          <span className="form-hint">例: /static/images/hero.jpg または外部URL</span>
        </label>
        <label>
          追加情報
          <textarea name="extra_info" rows="4" value={formState.extra_info} onChange={handleChange} />
          <span className="form-hint">キー=値形式で保存されます。セクションによって利用方法が異なります。</span>
        </label>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            保存
          </button>
          <button type="button" className="btn-outline" onClick={() => navigate(-1)}>
            戻る
          </button>
        </div>
      </form>
    </section>
  );
}

function createFormState(content = {}) {
  return {
    title: content.title ?? '',
    subtitle: content.subtitle ?? '',
    body: content.body ?? '',
    highlight: content.highlight ?? '',
    image: content.image ?? '',
    extra_info: content.extra_info ?? '',
  };
}
