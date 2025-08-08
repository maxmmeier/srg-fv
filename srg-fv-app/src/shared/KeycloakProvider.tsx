import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { authContext } from './AuthContext';
import Keycloak from 'keycloak-js';

export function KeycloakProvider({ children }: PropsWithChildren) {
  const isRun = useRef<boolean>(false);
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isRun.current) return;

    setIsLoading(true);
    isRun.current = true;

    const initKeycloak = async () => {
      const keycloackConfig = {
        url: import.meta.env.VITE_KEYCLOAK_URL as string,
        realm: import.meta.env.VITE_KEYCLOAK_REALM as string,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT as string,
      };
      const keycloakInstance: Keycloak = new Keycloak(keycloackConfig);

      keycloakInstance.onTokenExpired = async () => {
        await keycloakInstance.updateToken();
      };

      keycloakInstance
        .init({
          onLoad: 'check-sso',
        })
        .then((authenticated: boolean) => {
          setAuthenticated(authenticated);
        })
        .catch((error) => {
          console.error('Keycloak initialization failed:', error);
          setAuthenticated(false);
        })
        .finally(() => {
          setKeycloak(keycloakInstance);
          setIsLoading(false);
        });
    };

    initKeycloak();
  }, []);

  return (
    <authContext.Provider value={{ keycloak, authenticated, isLoading }}>
      {children}
    </authContext.Provider>
  );
}
