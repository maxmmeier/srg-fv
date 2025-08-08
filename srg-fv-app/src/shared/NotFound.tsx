import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();
  return <>{t('pageNotFound')}</>;
}
