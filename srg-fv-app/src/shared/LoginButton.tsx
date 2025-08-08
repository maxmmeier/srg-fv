import { Button } from './buttons/Button';
import useKeycloak from './useKeycloak';
import { useTranslation } from 'react-i18next';

export function LoginButton({ disabled = false }: { disabled: boolean }) {
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();

  return (
    <Button
      variant='contained'
      color='secondary'
      disabled={disabled}
      onClick={() => {
        keycloak?.login();
      }}>
      {t('login')}
    </Button>
  );
}
