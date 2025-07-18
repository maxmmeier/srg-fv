import { createTheme } from '@mui/material/styles';

export function theme() {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ffd000',
      },
      secondary: {
        main: '#dcdbd7',
      },
    },
  });
}
