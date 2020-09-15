import React, { ReactNode } from 'react';
import classnames from 'classnames';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import MaterialPaper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: 'auto',
    width: '100%',
    backgroundColor: theme.palette.colors.background.secondary,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    ['@media only screen and (max-width: ' + theme.palette.constants.breakWidth + 'px)']: {
      marginBottom: 10,
    },
  },
}));

interface Props {
  children: ReactNode;
  className?: string;
  outlined?: boolean;
}

function Paper({ children, className, outlined }: Props) {
  const classes = useStyles();

  return (
    <MaterialPaper className={classnames(classes.paper, className && className)} elevation={2} variant={outlined ? 'outlined' : 'elevation'}>
      {children}
    </MaterialPaper>
  );
}

export default Paper;
