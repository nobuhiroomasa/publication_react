import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { contentData, featureData, galleryData, announcementData } from '../data/cafeData.js';

const STORAGE_KEY = 'sampleCafeCmsPayload';
const USER_KEY = 'sampleCafeCmsUser';
const SESSION_KEY = 'sampleCafeCmsSession';
const hasWindow = typeof window !== 'undefined';

const defaultState = {
  contents: contentData,
  features: featureData,
  gallery: galleryData,
  announcements: announcementData,
};

const defaultUser = {
  username: 'admin',
  passwordHash: hashPassword('admin1234'),
};

const CmsDataContext = createContext(null);

function hashPassword(value) {
  if (typeof btoa === 'function') {
    return btoa(unescape(encodeURIComponent(value)));
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'utf-8').toString('base64');
  }
  return value;
}

function safeParse(value, fallback) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed;
  } catch (error) {
    return fallback;
  }
}

function loadState() {
  if (!hasWindow) return defaultState;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  const payload = safeParse(saved, defaultState);
  return {
    contents: { ...defaultState.contents, ...(payload.contents ?? {}) },
    features: payload.features ?? defaultState.features,
    gallery: payload.gallery ?? defaultState.gallery,
    announcements: payload.announcements ?? defaultState.announcements,
  };
}

function loadUser() {
  if (!hasWindow) return defaultUser;
  const saved = window.localStorage.getItem(USER_KEY);
  const payload = safeParse(saved, defaultUser);
  if (!payload.passwordHash) {
    return { ...payload, passwordHash: hashPassword('admin1234') };
  }
  return payload;
}

function persistState(nextState) {
  if (!hasWindow) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function persistUser(credentials) {
  if (!hasWindow) return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(credentials));
}

function createId() {
  if (hasWindow && typeof window.crypto?.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  return `cms-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function CmsDataProvider({ children }) {
  const [data, setData] = useState(() => loadState());
  const [credentials, setCredentials] = useState(() => loadUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (!hasWindow) return false;
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    persistState(data);
  }, [data]);

  useEffect(() => {
    persistUser(credentials);
  }, [credentials]);

  const login = (username, password) => {
    if (!username || !password) {
      throw new Error('ログインIDとパスワードを入力してください。');
    }
    if (
      username === credentials.username &&
      hashPassword(password) === credentials.passwordHash
    ) {
      setIsAuthenticated(true);
      if (hasWindow) {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      }
      return true;
    }
    throw new Error('ログイン情報が正しくありません。');
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (hasWindow) {
      window.sessionStorage.removeItem(SESSION_KEY);
    }
  };

  const updateContent = (section, payload) => {
    setData((prev) => ({
      ...prev,
      contents: {
        ...prev.contents,
        [section]: { ...prev.contents[section], ...payload },
      },
    }));
  };

  const addFeature = (feature) => {
    setData((prev) => ({
      ...prev,
      features: [{ id: createId(), ...feature }, ...prev.features],
    }));
  };

  const deleteFeature = (featureId) => {
    setData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature.id !== featureId),
    }));
  };

  const addAnnouncement = (announcement) => {
    setData((prev) => ({
      ...prev,
      announcements: [
        {
          id: createId(),
          published_at: new Date().toISOString(),
          ...announcement,
        },
        ...prev.announcements,
      ],
    }));
  };

  const deleteAnnouncement = (announcementId) => {
    setData((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((a) => a.id !== announcementId),
    }));
  };

  const addGalleryImage = ({ filePath, caption }) => {
    setData((prev) => ({
      ...prev,
      gallery: [
        {
          id: createId(),
          file_path: filePath,
          caption,
        },
        ...prev.gallery,
      ],
    }));
  };

  const deleteGalleryImage = (imageId) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((img) => img.id !== imageId),
    }));
  };

  const value = useMemo(
    () => ({
      data,
      loading,
      isAuthenticated,
      login,
      logout,
      updateContent,
      addFeature,
      deleteFeature,
      addAnnouncement,
      deleteAnnouncement,
      addGalleryImage,
      deleteGalleryImage,
    }),
    [data, loading, isAuthenticated]
  );

  return <CmsDataContext.Provider value={value}>{children}</CmsDataContext.Provider>;
}

export function useCmsData() {
  const context = useContext(CmsDataContext);
  if (!context) {
    throw new Error('useCmsData must be used within a CmsDataProvider.');
  }
  return context;
}
