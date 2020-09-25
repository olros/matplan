import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import URLS from 'URLS';
import { SnackbarProvider } from './context/SnackbarContext';
import { ThemeProvider } from './context/ThemeContext';

// Theme
import './assets/css/index.css';

// Project containers
import Expenses from 'containers/Expenses';
import Plan from 'containers/Plan';
import Profile from 'containers/Profile';
import Recipes from 'containers/Recipes';
import Shoppinglist from 'containers/Shoppinglist';

const Application = () => {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Expenses />} path={URLS.expenses} />
            <Route element={<Plan />} path={URLS.plan} />
            <Route element={<Profile />} path={URLS.profile} />
            <Route element={<Recipes />} path={URLS.recipes} />
            <Route element={<Shoppinglist />} path={URLS.shoppinglist} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<Application />, document.getElementById('root'));
