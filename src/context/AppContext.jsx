import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { TRANSLATIONS } from '../data/i18n';
import { SHAKUHACHI_SIZES } from '../data/sizes';

const AppContext = createContext();

function findSizeByLength(length) {
  return SHAKUHACHI_SIZES.find((s) => s.length === length) || SHAKUHACHI_SIZES.find((s) => s.key === 'D');
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('shaku-lang') || 'en');
  const [selectedLength, setSelectedLength] = useState(() => localStorage.getItem('shaku-length') || '1.8');

  useEffect(() => { localStorage.setItem('shaku-lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('shaku-length', selectedLength); }, [selectedLength]);

  const selectedSize = useMemo(() => findSizeByLength(selectedLength), [selectedLength]);
  const rootKey = selectedSize.key;

  return (
    <AppContext.Provider value={{ lang, setLang, rootKey, selectedLength, setSelectedLength, selectedSize }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export function useTranslation() {
  const { lang } = useContext(AppContext);
  return (key) => TRANSLATIONS[lang][key] || key;
}

export default AppContext;
