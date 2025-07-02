import { useTranslation } from 'react-i18next';
import { AddAppointmentOptions } from '../../../../srg-fv-contract/addAppointmentOptions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback } from 'react';

type Props = Readonly<{
  open: boolean;
  handleClose: () => void;
  handleConfirm: (body: AddAppointmentOptions) => void;
}>;

interface IAddAppointmentInput {
  date: string;
  time: string;
  appointmentName: string;
  location: string;
}

const AddAppointmentSchema = yup.object().shape({
  date: yup.string().required(),
  time: yup.string().required(),
  appointmentName: yup.string().required(),
  location: yup.string().required(),
});

const defaultValues: IAddAppointmentInput = {
  date: '',
  time: '',
  appointmentName: '',
  location: '',
};

export function AddAppointmentModal({
  open,
  handleClose,
  handleConfirm,
}: Props) {
  const { t } = useTranslation();

  const { register, control, handleSubmit, reset } =
    useForm<IAddAppointmentInput>({
      defaultValues: defaultValues,
      resolver: yupResolver(AddAppointmentSchema),
    });

  const onSubmit = useCallback((data: IAddAppointmentInput) => {
    handleConfirm({
      timestamp: new Date(`${data.date} ${data.time}`)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      name: data.appointmentName,
      location: data.location,
    });
    reset(defaultValues);
  }, []);

  const close = useCallback(() => {
    handleClose();
    reset(defaultValues);
  }, []);

  return (
    <>
      <Dialog open={open} onClose={close} fullWidth={true}>
        <DialogTitle>{t('addAppointment')}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit, (a) => console.log(a))}>
          <DialogContent>
            <Stack direction='column' spacing={2}>
              <Controller
                name='date'
                control={control}
                render={(field) => (
                  <TextField
                    {...register('date')}
                    variant='standard'
                    type='date'
                    label={t('date')}
                    helperText={
                      field.fieldState.error
                        ? field.fieldState.error.message
                        : ''
                    }
                    slotProps={{ inputLabel: { shrink: true } }}
                    sx={{ width: '100%' }}
                  />
                )}
              />
              <Controller
                name='time'
                control={control}
                render={(field) => (
                  <TextField
                    {...register('time')}
                    variant='standard'
                    type='time'
                    label={t('time')}
                    helperText={
                      field.fieldState.error
                        ? field.fieldState.error.message
                        : ''
                    }
                    slotProps={{ inputLabel: { shrink: true } }}
                    sx={{ width: '100%' }}
                  />
                )}
              />
              <Controller
                name='appointmentName'
                control={control}
                render={(field) => (
                  <TextField
                    {...register('appointmentName')}
                    variant='standard'
                    label={t('appointmentName')}
                    placeholder={t('appointmentNamePlaceholder')}
                    helperText={
                      field.fieldState.error
                        ? field.fieldState.error.message
                        : ''
                    }
                    sx={{ width: '100%' }}
                  />
                )}
              />
              <Controller
                name='location'
                control={control}
                render={(field) => (
                  <TextField
                    {...register('location')}
                    variant='standard'
                    label={t('location')}
                    placeholder={t('locationPlaceholder')}
                    helperText={
                      field.fieldState.error
                        ? field.fieldState.error.message
                        : ''
                    }
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='secondary' onClick={close}>
              {t('close')}
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              {t('add')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
