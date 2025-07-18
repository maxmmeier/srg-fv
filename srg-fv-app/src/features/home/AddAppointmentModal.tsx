import { useTranslation } from 'react-i18next';
import { AddAppointmentOptions } from '../../../../srg-fv-contract/addAppointmentOptions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCallback } from 'react';
import { Button } from '../../shared/buttons/Button';
import { FormTexField } from '../../shared/FormTextField';

type Props = Readonly<{
  open: boolean;
  handleClose: () => void;
  handleConfirm: (body: AddAppointmentOptions) => void;
}>;

type AddAppointmentInput = z.infer<typeof AddAppointmentSchema>;

const AddAppointmentSchema = z.object({
  date: z.string().min(1),
  time: z.string().min(1),
  appointmentName: z.string().min(1),
  location: z.string().min(1),
});

const defaultValues: AddAppointmentInput = {
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
    useForm<AddAppointmentInput>({
      defaultValues: defaultValues,
      resolver: zodResolver(AddAppointmentSchema),
    });

  const onSubmit = useCallback((data: AddAppointmentInput) => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack direction='column' spacing={2}>
              <Controller
                name='date'
                control={control}
                render={(field) => (
                  <FormTexField
                    {...register(field.field.name)}
                    fieldName={field.field.name}
                    fieldState={field.fieldState}
                    type='date'
                  />
                )}
              />
              <Controller
                name='time'
                control={control}
                render={(field) => (
                  <FormTexField
                    {...register(field.field.name)}
                    fieldName={field.field.name}
                    fieldState={field.fieldState}
                    type='time'
                  />
                )}
              />
              <Controller
                name='appointmentName'
                control={control}
                render={(field) => (
                  <FormTexField
                    {...register(field.field.name)}
                    fieldName={field.field.name}
                    fieldState={field.fieldState}
                  />
                )}
              />
              <Controller
                name='location'
                control={control}
                render={(field) => (
                  <FormTexField
                    {...register(field.field.name)}
                    fieldName={field.field.name}
                    fieldState={field.fieldState}
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
