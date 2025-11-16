import { useCmsData } from '../context/CmsDataContext.jsx';

export function useCafeData() {
  const { data, loading } = useCmsData();

  return {
    contents: data.contents,
    features: data.features,
    gallery: data.gallery,
    announcements: data.announcements,
    loading,
    error: null,
  };
}
