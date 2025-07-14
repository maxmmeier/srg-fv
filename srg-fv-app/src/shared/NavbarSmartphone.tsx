import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import useKeycloak from './useKeycloak';
import Box from '@mui/material/Box';

export function NavbarSmartphone() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const { authenticated } = useKeycloak();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton size='large' color='inherit' onClick={handleOpenNavMenu}>
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}>
          {authenticated ? (
            <MenuItem onClick={handleCloseNavMenu}>
              <Link href='/mitglieder' underline='none'>
                {t('members')}
              </Link>
            </MenuItem>
          ) : (
            <></>
          )}

          <MenuItem onClick={handleCloseNavMenu}>
            <Link href='/antrag' underline='none'>
              {t('applyForMembership')}
            </Link>
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
        <Link
          href='/'
          underline='none'
          variant='h6'
          sx={{ color: 'white', marginRight: 2, fontWeight: 600 }}>
          {t('supportAssociationSrgStuttgart')}
        </Link>
      </Box>
    </>
  );
}
