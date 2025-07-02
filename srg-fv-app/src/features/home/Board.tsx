import Stack from '@mui/material/Stack';
import { BoardCard } from './BoardCard';
import { useTranslation } from 'react-i18next';

export function Board() {
  const { t } = useTranslation();

  return (
    <Stack direction='row' spacing={2} sx={{ marginBottom: 3 }}>
      <BoardCard
        imageName='img-1.jpg'
        name={t('stipe')}
        role={t('firstChairman')}
        club={t('vfbStuttgart')}></BoardCard>

      <BoardCard
        imageName='img-2.jpg'
        name={t('markus')}
        role={t('secondChairman')}
        club={t('sgUntertürkheim')}></BoardCard>

      <BoardCard
        imageName='img-3.jpg'
        name={t('ciara')}
        role={t('treasurer')}
        club={t('tsvAltingen')}></BoardCard>

      <BoardCard
        imageName='img-4.jpg'
        name={t('johanna')}
        role={t('secretary')}
        club={t('svStuttgarterKickers')}></BoardCard>

      <BoardCard
        imageName='img-5.jpg'
        name={t('max')}
        role={t('assessor')}
        club={t('sgUntertürkheim')}></BoardCard>
    </Stack>
  );
}
