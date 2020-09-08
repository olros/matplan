import React from 'react';
// import { db } from '../../firebase';
import { useAuth } from 'hooks/Auth';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Project components
import Paper from 'components/layout/Paper';
import Root from 'components/layout/Root';
import Navigation from 'components/navigation/Navigation';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 20,
  },
}));

const Recipes = () => {
  const classes = useStyles();
  const [auth, isLoading] = useAuth();

  return (
    <Navigation footer isLoading={Boolean(isLoading)}>
      <Root>
        <Typography variant='h1'>Oppskrifter</Typography>
        <Paper className={classes.paper} outlined>
          <Typography variant='h2'>Her kommer oppskrifter</Typography>
          {auth && <Typography variant='h4'></Typography>}
        </Paper>
      </Root>
    </Navigation>
  );
};

export default Recipes;
