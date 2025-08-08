import { PropsWithChildren } from 'react';
import useKeycloak from './useKeycloak';
import { NotFound } from './NotFound';
import { Page } from './Page';

export function AuthRequired({ children }: PropsWithChildren) {
  const { authenticated, isLoading } = useKeycloak();

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          {authenticated ? (
            <>{children}</>
          ) : (
            <>
              <Page header=':('>
                <NotFound />
              </Page>
            </>
          )}
        </>
      )}
    </>
  );
}
