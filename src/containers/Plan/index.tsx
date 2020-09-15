import React, { useEffect, useCallback, useState } from 'react';
import { db } from '../../firebase';
import { useAuth } from 'hooks/Auth';
import { IPlan, IDay } from 'types/Firestore';
import { getFormattedDate } from 'utils';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// Project components
import Paper from 'components/layout/Paper';
import Root from 'components/layout/Root';
import Navigation from 'components/navigation/Navigation';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 20,
  },
  button: {
    marginTop: 10,
    height: 56,
  },
}));

const dateToNumber = (date: Date): number => {
  return Number(String(date.getFullYear()) + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0'));
};

const numberToDate = (num: number) => {
  return new Date(Number(String(num).substring(0, 4)), Number(String(num).substring(4, 6)) - 1, Number(String(num).substring(6, 8)));
};

const Day = ({ day, updateDay }: { day: IDay; updateDay: (plan: string, day: number) => void }) => {
  const [plan, setPlan] = useState<string>(day?.plan || '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateDay(plan, day.day), [plan]);

  return (
    <React.Fragment>
      <Typography variant='h3'>{getFormattedDate(numberToDate(day.day), false, true, true, true, false)}</Typography>
      <TextField
        fullWidth
        onChange={(e) => setPlan(e.target.value)}
        placeholder={getFormattedDate(numberToDate(day.day), false, true, true, true, false)}
        value={plan}
        variant='outlined'
      />
    </React.Fragment>
  );
};

const Plan = () => {
  const classes = useStyles();
  const [auth, isAuthLoading] = useAuth();
  const [isDbLoading, setIsDbLoading] = useState(true);
  const [days, setDays] = useState<IDay[]>([]);
  const [previous, setPrevious] = useState(false);
  const today = dateToNumber(new Date());

  useEffect(() => {
    if (auth && !isAuthLoading) {
      db.collection('plans')
        .doc(auth.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data() as IPlan;
            setDays([...data.days]);
            setIsDbLoading(false);
          } else {
            db.collection('plans').doc(auth.uid).set({
              uid: auth.uid,
              public: false,
              days: [],
            });
          }
        });
    }
  }, [auth, isAuthLoading]);

  useEffect(() => {
    const unsub = setTimeout(() => {
      if (auth && !isAuthLoading && !isDbLoading) {
        db.collection('plans').doc(auth.uid).update({ days: days });
      }
    }, 500);
    return () => clearTimeout(unsub);
  }, [days, auth, isAuthLoading, isDbLoading]);

  const updateDay = useCallback(
    (plan: string, day: number) => {
      const newDays = [...days];
      const index = days.findIndex((d) => d.day === day);
      if (index > -1 && newDays[index].plan !== plan) {
        newDays[index] = { ...newDays[index], plan: plan };
        setDays(newDays);
      }
    },
    [days],
  );

  const addDay = () => {
    if (days.length) {
      const lastDay = days.sort((a, b) => (previous ? b.day - a.day : a.day - b.day))[days.length - 1];
      const nextDate = numberToDate(lastDay.day);
      nextDate.setDate(nextDate.getDate() + 1);
      const nextDay = dateToNumber(nextDate);
      setDays([...days, { day: nextDay, plan: '' }]);
    } else {
      setDays([{ day: dateToNumber(new Date()), plan: '' }]);
    }
  };

  return (
    <Navigation footer isLoading={Boolean(isAuthLoading) || isDbLoading}>
      <Root>
        <Typography variant='h1'>Matplan</Typography>
        <Paper className={classes.paper} outlined>
          <FormControlLabel
            control={<Switch checked={previous} name='checkedA' onChange={(e) => setPrevious(e.target.checked)} />}
            label='Vis tidligere dager'
          />
          {days
            .filter((d) => (previous ? d.day < today : d.day >= today))
            .sort((a, b) => (previous ? b.day - a.day : a.day - b.day))
            .map((day) => (
              <Day day={day} key={day.day} updateDay={updateDay} />
            ))}
          {!previous && (
            <Button className={classes.button} color='primary' fullWidth onClick={addDay} variant='contained'>
              Legg til dag
            </Button>
          )}
        </Paper>
      </Root>
    </Navigation>
  );
};

export default Plan;
