import { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';

// Project Components
import Footer from './Footer';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.type === 'light' ? '#f1f0f5' : '#121212',
  },
  main: {
    minHeight: '101vh',
  },
}));

const Navigation = () => {
  const classes = useStyles();
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <TopBar />
      </Hidden>
      <main className={classes.main}>
        <Suspense fallback='Laster'>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Hidden mdUp>
        <BottomBar />
      </Hidden>
    </div>
  );
};

export default Navigation;
