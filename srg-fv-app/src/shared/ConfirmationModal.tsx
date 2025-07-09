import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { Button } from './buttons/Button';

export function ConfirmationModal({
  title,
  message,
  buttonText,
  open,
  handleClose,
  handleConfirm,
}: {
  title: string;
  message: string;
  buttonText: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='secondary' onClick={handleClose}>
          {t('close')}
        </Button>
        <Button variant='contained' color='primary' onClick={handleConfirm}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
