import { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import './Page.css';
import useKeycloak from './useKeycloak';
import Container from '@mui/material/Container';

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
          <div className='main-page'>
            <Navbar />

            <Container className='mb-3 mt-2'>
              <h1>{header}</h1>
            </Container>
            <Container className='main-page-container'>{children}</Container>

            <Container className='mt-3'>
              <Footer />
            </Container>
          </div>
        </>
      )}
    </>
  );
}
