import { createContext } from 'react';
import Keycloak from 'keycloak-js';

export interface AuthContextProps {
  keycloak: Keycloak | null;
  authenticated: boolean;
  isLoading: boolean;
}

export const authContext = createContext<AuthContextProps | undefined>(
  undefined,
);
