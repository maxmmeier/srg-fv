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
        <span>&copy;&nbsp;{t('copyRightSupportAssociation')}</span>

        <span className='float-end'>
          <Link
            className='link-opacity-50-hover link-underline-opacity-0 link-dark me-4'
            href='https://github.com/maxmmeier/srg-fv'
            underline='hover'
            sx={{ marginRight: 1 }}>
            {t('source')}
          </Link>
          <Link
            className='link-opacity-50-hover link-underline-opacity-0 link-dark me-4'
            href='datenschutz'
            underline='hover'
            sx={{ marginRight: 1 }}>
            {t('privacy')}
          </Link>
          <Link
            className='link-opacity-50-hover link-underline-opacity-0 link-dark me-4'
            href='impressum'
            underline='hover'>
            {t('imprint')}
          </Link>
        </span>
      </Stack>
    </>
  );
}
