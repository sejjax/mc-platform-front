import i18n from 'i18next';
import { useSelector } from 'react-redux';

const useTranslation = () => {
  const language = useSelector((state) => state.Layout.language);

  return (key = '', params = {}) => String(i18n.t(key, { ...params, lng: language }));
};

export default useTranslation;
