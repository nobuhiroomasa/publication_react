import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCmsData } from '../../context/CmsDataContext.jsx';

export default function AdminLogin() {
  const { login, isAuthenticated } = useCmsData();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(formState.username.trim(), formState.password);
      const redirectTo = location.state?.from ?? '/admin';
      navigate(redirectTo, { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <div className="admin-root login-body">
      <div className="login-card">
        <div className="login-brand">
          <i className="fas fa-mug-hot" aria-hidden="true" />
          <h1>Sample Cafe CMS</h1>
          <p>管理画面にログインしてコンテンツを更新できます。</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">ログインID</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button type="submit" className="btn-primary">
            ログイン
          </button>
        </form>
        {error ? (
          <div className="flash-wrapper">
            <p className="flash flash-danger" role="alert">
              {error}
            </p>
          </div>
        ) : null}
        <p className="login-note">
          初期ID: admin / 初期パスワード: admin1234<br />ログイン後に必ず変更してください。
        </p>
      </div>
    </div>
  );
}
