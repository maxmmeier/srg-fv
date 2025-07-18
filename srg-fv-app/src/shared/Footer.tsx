import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box>&copy;&nbsp;{t('copyRightSupportAssociation')}</Box>

        <Box>
          <Link
            href='https://github.com/maxmmeier/srg-fv'
            underline='hover'
            sx={{ marginRight: 1 }}>
            {t('source')}
          </Link>
          <Link href='datenschutz' underline='hover' sx={{ marginRight: 1 }}>
            {t('privacy')}
          </Link>
          <Link href='impressum' underline='hover'>
            {t('imprint')}
          </Link>
        </Box>
      </Stack>
    </>
  );
}
