import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export function Board() {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box
          component='img'
          src='src/assets/img-1.jpg'
          sx={{ width: '100%' }}></Box>

        <Typography variant='caption'>{t('boardImageDescription')}</Typography>
      </Box>
    </>
  );
}
