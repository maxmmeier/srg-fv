import { useContext } from 'react';
import { authContext } from './AuthContext';

const useKeycloak = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }

  return context;
};

export default useKeycloak;
