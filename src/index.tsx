import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import URLS from './URLS';

// Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { darkTheme } from './theme';
import './assets/css/index.css';

// Project containers
import Landing from 'containers/Landing';

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
    <BrowserRouter>
      <MuiThemeProvider theme={darkTheme}>
        <Routes>
          <Route element={<Landing />} path={URLS.landing} />
        </Routes>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Application />, document.getElementById('root'));
