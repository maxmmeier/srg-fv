import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Apply } from './features/apply/Apply.tsx';
import { Page } from './shared/Page.tsx';

import i18n from './i18n.ts';
import './i18n.ts';
import { KeycloakProvider } from './shared/KeycloakProvider.tsx';
import { Members } from './features/members/Members.tsx';
import { NotFound } from './shared/NotFound.tsx';
import { Home } from './features/home/Home.tsx';
import { AuthRequired } from './shared/AuthRequired.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <KeycloakProvider>
    <ThemeProvider theme={theme()}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Page header={i18n.t('supportAssociationSrgStuttgart')}>
                <Home />
              </Page>
            }
          />
          <Route
            path='mitglieder'
            element={
              <AuthRequired>
                <Page header={i18n.t('members')}>
                  <Members />
                </Page>
              </AuthRequired>
            }
          />
          <Route
            path='antrag'
            element={
              <Page header={i18n.t('applyForMembership')}>
                <Apply />
              </Page>
            }
          />
          <Route
            path='datenschutz'
            element={
              <Page header={i18n.t('privacy')}>
                <>TODO</>
              </Page>
            }
          />
          <Route
            path='impressum'
            element={
              <Page header={i18n.t('imprint')}>
                <>TODO</>
              </Page>
            }
          />
          <Route
            path='*'
            element={
              <Page header=':('>
                <NotFound />
              </Page>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </KeycloakProvider>,
);
