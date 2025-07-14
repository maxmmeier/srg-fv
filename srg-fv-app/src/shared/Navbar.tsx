import { KeycloakNavbar } from './KeycloakNavbar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarSmartphone } from './NavbarSmartphone';

export function Navbar() {
  return (
    <>
      <AppBar>
        <Toolbar sx={{ display: 'flex' }}>
          <NavbarDesktop />
          <NavbarSmartphone />

          <KeycloakNavbar />
        </Toolbar>
      </AppBar>
    </>
  );
}
