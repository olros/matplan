import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import URLS from 'URLS';
import { SnackbarProvider } from './context/SnackbarContext';

// Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { darkTheme } from './theme';
import './assets/css/index.css';

// Project containers
import Expenses from 'containers/Expenses';
import Plan from 'containers/Plan';
import Profile from 'containers/Profile';
import Recipes from 'containers/Recipes';

const Application = () => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // const automaticTheme = useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

  // const [theme, setTheme] = useState(lightTheme);
  // const updateTheme = (newThemeName: string) => {
  //   if (newThemeName === 'automatic') {
  //     setTheme(automaticTheme);
  //   } else if (newThemeName === 'dark') {
  //     setTheme(darkTheme);
  //   } else {
  //     setTheme(lightTheme);
  //   }
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => updateTheme(COOKIE.get(THEME)), [automaticTheme]);

  // const themeStore = {
  //   theme: { get: theme, set: updateTheme },
  // };

  return (
    <MuiThemeProvider theme={darkTheme}>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Expenses />} path={URLS.expenses} />
            <Route element={<Plan />} path={URLS.plan} />
            <Route element={<Profile />} path={URLS.profile} />
            <Route element={<Recipes />} path={URLS.recipes} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<Application />, document.getElementById('root'));
