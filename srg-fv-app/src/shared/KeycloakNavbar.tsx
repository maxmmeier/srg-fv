import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import useKeycloak from './useKeycloak';
import { UserInformation } from './UserInformation';
import Box from '@mui/material/Box';

export function KeycloakNavbar() {
  const { authenticated, isLoading } = useKeycloak();

  return (
    <Box sx={{ display: 'flex', flexGrow: 0 }}>
      {isLoading ? (
        <LoginButton disabled={true} />
      ) : authenticated ? (
        <>
          <UserInformation />
          <LogoutButton />
        </>
      ) : (
        <LoginButton disabled={false} />
      )}
    </Box>
  );
}
