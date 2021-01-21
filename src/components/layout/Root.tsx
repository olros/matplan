import { ReactNode } from 'react';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: theme.palette.constants.maxWidth,
    margin: 'auto',
    padding: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ['@media only screen and (max-width: ' + theme.palette.constants.breakWidth + 'px)']: {
      padding: 10,
      paddingTop: 20,
    },
  },
}));

interface Props {
  children: ReactNode;
}

function Root({ children }: Props) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}

export default Root;
