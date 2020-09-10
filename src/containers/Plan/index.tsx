import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useAuth } from 'hooks/Auth';
import { IPlan, IDay } from 'types/Firestore';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// Project components
import Paper from 'components/layout/Paper';
import Root from 'components/layout/Root';
import Navigation from 'components/navigation/Navigation';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 20,
  },
}));

const Plan = () => {
  const classes = useStyles();
  const [auth, isLoading] = useAuth();
  const [days, setDays] = useState<IDay[]>([]);

  useEffect(() => {
    if (auth && !isLoading) {
      db.collection('plans')
        .doc(auth.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data() as IPlan;
            setDays([...data.days].sort((a, b) => a.day - b.day));
          }
        });
    }
  }, [auth, isLoading]);

  return (
    <Navigation footer isLoading={Boolean(isLoading)}>
      <Root>
        <Typography variant='h1'>Matplan</Typography>
        <Paper className={classes.paper} outlined>
          <Typography variant='h2'>Her kommer Matplan</Typography>
          {days.map((day) => {
            // console.log(day);
            return (
              <React.Fragment key={day.day}>
                <Typography variant='h4'>I dag</Typography>
                <TextField fullWidth value={day.plan} variant='outlined' />
              </React.Fragment>
            );
          })}
        </Paper>
      </Root>
    </Navigation>
  );
};

export default Plan;
