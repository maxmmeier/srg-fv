import TextField from '@mui/material/TextField';
import { HTMLInputTypeAttribute } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Props = Readonly<{
  fieldName: string;
  fieldState: ControllerFieldState;
  type?: HTMLInputTypeAttribute;
}>;

export function FormTexField({
  fieldName,
  fieldState,
  type = 'text',
  ...props
}: Props) {
  const { t } = useTranslation();

  return (
    <TextField
      {...props}
      variant='standard'
      type={type}
      label={t(fieldName)}
      placeholder={t(`${fieldName}Placeholder`)}
      helperText={fieldState.error ? fieldState.error.message : ''}
      slotProps={{
        inputLabel: type === 'time' || type === 'date' ? { shrink: true } : {},
      }}
      sx={{ width: '100%' }}
    />
  );
}
