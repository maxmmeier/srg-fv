import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './buttons/Button';

export function AddButton({
  setShow,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => {
        setShow(true);
      }}>
      {t('add')}
    </Button>
  );
}
