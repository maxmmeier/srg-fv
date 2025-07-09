import { styled } from '@mui/system';
import MuiButton, { ButtonProps } from '@mui/material/Button';

const StyledMuiButton = styled(MuiButton)({
  textTransform: 'none',
});

export function Button({ ...props }: ButtonProps) {
  return <StyledMuiButton {...props} />;
}
