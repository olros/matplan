import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import URLS from './URLS';
import firebase, { auth } from './firebase';
import { SnackbarProvider } from './context/SnackbarContext';

// Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { darkTheme } from './theme';
import './assets/css/index.css';

// Project containers
import Landing from 'containers/Landing';
import Profile from 'containers/Profile';

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

  console.log(auth.currentUser);

  // useEffect(() => {
  //   if (!auth.currentUser) {
  //     auth.signInAnonymously().catch((error) => {
  //       console.log(error.code, error.message);
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       const isAnonymous = user.isAnonymous;
  //       const uid = user.uid;
  //       console.log(isAnonymous, uid);

  //       const credential = firebase.auth.EmailAuthProvider.credential('olafrosendahl@gmail.com', '123456');
  //       console.log(credential);
  //       if (auth.currentUser) {
  //         console.log(auth.currentUser);
  //         auth.currentUser
  //           .linkWithCredential(credential)
  //           .then(function (usercred) {
  //             const user = usercred.user;
  //             console.log('Anonymous account successfully upgraded', user);
  //           })
  //           .catch(function (error) {
  //             console.log('Error upgrading anonymous account', error);
  //           });
  //       }
  //       // ...
  //     } else {
  //       // User is signed out.
  //       // ...
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <MuiThemeProvider theme={darkTheme}>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Landing />} path={URLS.landing} />
            <Route element={<Profile />} path={URLS.profile} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<Application />, document.getElementById('root'));
