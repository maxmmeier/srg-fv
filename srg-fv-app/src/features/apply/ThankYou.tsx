import { useTranslation } from 'react-i18next';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';

export function ThankYou() {
  const { t } = useTranslation();

  return (
    <div>
      <Typography component='span' sx={{ marginRight: 1 }}>
        {t('thankYou')}
      </Typography>

      <FavoriteIcon color='error'></FavoriteIcon>
    </div>
  );
}
