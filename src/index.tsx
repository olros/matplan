// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { lazy } from 'react';
import { unstable_createRoot as createRoot } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import URLS from 'URLS';
import { SnackbarProvider } from './context/SnackbarContext';
import { ThemeProvider } from './context/ThemeContext';

// Theme
import './assets/css/index.css';

// Project containers
import Navigation from 'components/navigation/Navigation';
const Expenses = lazy(() => import('containers/Expenses'));
const Plan = lazy(() => import('containers/Plan'));
const Profile = lazy(() => import('containers/Profile'));
const Recipes = lazy(() => import('containers/Recipes'));
const Shoppinglist = lazy(() => import('containers/Shoppinglist'));

const Application = () => {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Navigation />} path={'*'}>
              <Route element={<Expenses />} path={URLS.expenses} />
              <Route element={<Plan />} path={URLS.plan} />
              <Route element={<Profile />} path={URLS.profile} />
              <Route element={<Recipes />} path={URLS.recipes} />
              <Route element={<Shoppinglist />} path={URLS.shoppinglist} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
);
