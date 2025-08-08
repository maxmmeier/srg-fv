import Link from '@mui/material/Link';
import useKeycloak from './useKeycloak';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

export function NavbarDesktop() {
  const { t } = useTranslation();
  const { authenticated } = useKeycloak();

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex', flexGrow: 1 } }}>
      <Link
        href='/'
        underline='none'
        variant='h6'
        color='textPrimary'
        sx={{ marginRight: 2, fontWeight: 600 }}>
        {t('supportAssociationSrgStuttgart')}
      </Link>

      {authenticated ? (
        <Link
          href='/mitglieder'
          underline='none'
          variant='h6'
          color='textPrimary'
          sx={{ marginRight: 2 }}>
          {t('members')}
        </Link>
      ) : (
        <></>
      )}

      <Link
        href='antrag'
        underline='none'
        variant='h6'
        color='textPrimary'
        sx={{ marginRight: 2 }}>
        {t('applyForMembership')}
      </Link>
    </Box>
  );
}
