import Keycloak, { KeycloakConfig } from 'keycloak-connect';

export function getKeycloak() {
  const keycloakConfig = {
    'confidential-port': 0,
    realm: process.env.KEYCLOAK_REALM,
    'auth-server-url': `${process.env.KEYCLOAK_URL}`,
    'ssl-required': 'external',
    resource: process.env.KEYCLOAK_CLIENT,
    'bearer-only': true,
  } as KeycloakConfig;

  const keycloak = new Keycloak({}, keycloakConfig);

  return keycloak;
}
