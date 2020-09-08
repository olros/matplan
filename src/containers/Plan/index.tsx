import React from 'react';
// import { db } from '../../firebase';
import { useAuth } from 'hooks/Auth';

// Material UI Components
import Typography from '@material-ui/core/Typography';

// Project components
import Paper from 'components/layout/Paper';
import Root from 'components/layout/Root';
import Navigation from 'components/navigation/Navigation';

const Plan = () => {
  const [auth, isLoading] = useAuth();

  return (
    <Navigation footer isLoading={Boolean(isLoading)}>
      <Root>
        <Typography variant='h1'>Matplan</Typography>
        <Paper>
          <Typography variant='h1'>H1</Typography>
          <Typography variant='h2'>H2</Typography>
          <Typography variant='h3'>H3</Typography>
          <Typography variant='h4'>H4</Typography>
          {auth && <Typography variant='h4'>Authed</Typography>}
        </Paper>
      </Root>
    </Navigation>
  );
};

export default Plan;
