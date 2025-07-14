import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ControllerFieldState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Props = Readonly<{
  fieldName: string;
  fieldState: ControllerFieldState;
}>;

export function FormCheckbox({ fieldName, fieldState, ...props }: Props) {
  const { t } = useTranslation();

  return (
    <FormControlLabel control={<Checkbox />} {...props} label={t(fieldName)} />
  );
}
