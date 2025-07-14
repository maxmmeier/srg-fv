import { useEffect, useRef, useState } from 'react';
import useKeycloak from './useKeycloak';
import Typography from '@mui/material/Typography';

export function UserInformation() {
  const isRun = useRef<boolean>(false);
  const { keycloak } = useKeycloak();
  const [name, setName] = useState('');

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    (async () => {
      const userName = await keycloak?.loadUserProfile();
      setName(userName?.username ?? '');
    })();
  }, []);

  return <Typography sx={{ marginRight: 2, lineHeight: 3 }}>{name}</Typography>;
}
