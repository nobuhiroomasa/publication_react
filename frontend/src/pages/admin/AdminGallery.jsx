import { useState } from 'react';
import { useCafeData } from '../../hooks/useCafeData.js';
import { useCmsData } from '../../context/CmsDataContext.jsx';
import { readFileAsDataUrl } from '../../lib/fileUtils.js';

export default function AdminGallery() {
  const { gallery } = useCafeData();
  const { addGalleryImage, deleteGalleryImage } = useCmsData();
  const [formState, setFormState] = useState({ caption: '', file: null });
  const [status, setStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'file') {
      setFormState((prev) => ({ ...prev, file: files?.[0] ?? null }));
      return;
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formState.file) {
      setStatus({ type: 'warning', message: '画像ファイルを選択してください。' });
      return;
    }
    try {
      setIsUploading(true);
      const filePath = await readFileAsDataUrl(formState.file);
      addGalleryImage({
        filePath,
        caption: formState.caption.trim(),
      });
      setFormState({ caption: '', file: null });
      event.currentTarget.reset();
      setStatus({ type: 'success', message: 'ギャラリーに画像を追加しました。' });
    } catch (error) {
      setStatus({ type: 'danger', message: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (imageId) => {
    deleteGalleryImage(imageId);
    setStatus({ type: 'info', message: '画像を削除しました。' });
  };

  return (
    <section className="form-section">
      <header>
        <h1>ギャラリー管理</h1>
        <p>掲載画像をアップロードまたは削除できます。</p>
      </header>
      {status ? (
        <div className="flash-wrapper">
          <p className={`flash flash-${status.type}`}>{status.message}</p>
        </div>
      ) : null}
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          画像ファイル
          <input type="file" name="file" accept="image/*" onChange={handleInputChange} required />
        </label>
        <label>
          キャプション
          <input name="caption" value={formState.caption} onChange={handleInputChange} placeholder="例: シグネチャードリンク" />
        </label>
        <button type="submit" className="btn-primary" disabled={isUploading}>
          {isUploading ? 'アップロード中…' : 'アップロード'}
        </button>
      </form>
      <div className="gallery-admin-grid">
        {gallery.map((image) => (
          <article key={image.id} className="gallery-admin-item">
            <img src={image.file_path} alt={image.caption || 'Gallery item'} />
            <p>{image.caption || 'キャプション未設定'}</p>
            <button type="button" className="btn-outline" onClick={() => handleDelete(image.id)}>
              削除
            </button>
          </article>
        ))}
        {gallery.length === 0 ? <p className="empty-hint">まだ画像が登録されていません。</p> : null}
      </div>
    </section>
  );
}
