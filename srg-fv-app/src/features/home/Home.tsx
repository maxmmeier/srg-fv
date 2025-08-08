import { useTranslation } from 'react-i18next';
import { Board } from './Board';
import { Appointments } from './Appointments';

export function Home() {
  const { t } = useTranslation();
  return (
    <>
      <h3>{t('board')}</h3>

      <Board></Board>

      <h3>{t('appointments')}</h3>

      <Appointments></Appointments>
    </>
  );
}
