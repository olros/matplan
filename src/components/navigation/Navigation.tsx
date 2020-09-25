import React, { useEffect, ReactNode } from 'react';

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
    background: theme.palette.colors.background.primary,
  },
  main: {
    minHeight: '101vh',
  },
}));

interface Props {
  children: ReactNode;
  isLoading?: boolean;
  footer?: boolean;
  noTopbar?: boolean;
}

const Navigation = ({ children, isLoading, footer, noTopbar }: Props) => {
  const classes = useStyles();
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className={classes.root}>
      {!noTopbar && (
        <Hidden smDown>
          <TopBar />
        </Hidden>
      )}
      <main className={classes.main}>{isLoading ? <LinearProgress /> : <div>{children}</div>}</main>
      {footer && !isLoading && <Footer />}
      <Hidden mdUp>
        <BottomBar />
      </Hidden>
    </div>
  );
};

export default Navigation;
