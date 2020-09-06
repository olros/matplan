import React, { useEffect, ReactNode } from 'react';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';

// Project Components
import Footer from './Footer';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const useStyles = makeStyles(() => ({
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
    <>
      {!noTopbar && (
        <Hidden xsDown>
          <TopBar />
        </Hidden>
      )}
      <main className={classes.main}>{isLoading ? <LinearProgress /> : <div>{children}</div>}</main>
      {footer && !isLoading && <Footer />}
      <Hidden smUp>
        <BottomBar />
      </Hidden>
    </>
  );
};

export default Navigation;
