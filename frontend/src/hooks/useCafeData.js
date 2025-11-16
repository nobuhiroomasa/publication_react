import { useEffect, useState } from 'react';
import { contentData, featureData, galleryData, announcementData } from '../data/cafeData.js';

export function useCafeData() {
  const [state, setState] = useState({
    contents: {},
    features: [],
    gallery: [],
    announcements: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) {
        return;
      }
      setState({
        contents: contentData,
        features: featureData,
        gallery: galleryData,
        announcements: announcementData,
        loading: false,
        error: null,
      });
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return state;
}
