import { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import useKeycloak from './useKeycloak';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

interface PageProps {
  header: string;
}

export function Page({ header, children }: PropsWithChildren<PageProps>) {
  const { isLoading } = useKeycloak();
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <CssBaseline />
          <Box>
            <Navbar />

            <Box
              component='main'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100%',
              }}>
              <Toolbar />

              <Container
                sx={{
                  marginBottom: 3,
                  marginTop: 2,
                }}>
                <h1>{header}</h1>
              </Container>

              <Container
                sx={{
                  flexGrow: 1,
                  overflow: 'auto',
                }}>
                {children}
              </Container>

              <Container
                sx={{
                  marginTop: 3,
                }}>
                <Footer />
              </Container>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
