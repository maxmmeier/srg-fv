import { Button } from './buttons/Button';
import useKeycloak from './useKeycloak';
import { useTranslation } from 'react-i18next';

export function LogoutButton() {
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();

  return (
    <Button
      variant='contained'
      color='secondary'
      onClick={() => {
        keycloak?.logout();
      }}>
      {t('logout')}
    </Button>
  );
}
