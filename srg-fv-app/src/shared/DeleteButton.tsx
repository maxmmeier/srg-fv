import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './buttons/Button';

export function DeleteButton({
  id,
  setDeleteId,
  setShow,
}: {
  id: number;
  setDeleteId: Dispatch<SetStateAction<number | null>>;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();

  return (
    <Button
      variant='contained'
      color='error'
      onClick={() => {
        setDeleteId(id);
        setShow(true);
      }}
      sx={{ marginLeft: 1 }}>
      {t('delete')}
    </Button>
  );
}
