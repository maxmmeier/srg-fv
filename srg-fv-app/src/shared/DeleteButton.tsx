import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

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
      className='btn-sm ms-3'
      onClick={() => {
        setDeleteId(id);
        setShow(true);
      }}>
      {t('delete')}
    </Button>
  );
}
