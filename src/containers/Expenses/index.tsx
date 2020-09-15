import React, { useState, useEffect } from 'react';
import firebase, { db } from '../../firebase';
import { useAuth } from 'hooks/Auth';
import { IExpense, IExpense_month } from 'types/Firestore';
import { getFormattedDate, numberToDate } from 'utils';
import { useForm, Controller } from 'react-hook-form';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

// Icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoneyIcon from '@material-ui/icons/AttachMoneyRounded';
import MonthIcon from '@material-ui/icons/EventRounded';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';

// Project components
import Paper from 'components/layout/Paper';
import Root from 'components/layout/Root';
import Navigation from 'components/navigation/Navigation';

const useStyles = makeStyles(() => ({
  nested: {
    paddingLeft: 40,
  },
  field: {
    margin: '8px 0',
  },
  content: {
    marginTop: 20,
    display: 'grid',
    gridGap: 20,
    gridTemplateAreas: '"overview add"',
    gridTemplateColumns: '2fr 1fr',
    '@media only screen and (max-width: 600px)': {
      gridGap: 10,
      gridTemplateAreas: '"add" "overview"',
      gridTemplateColumns: '1fr',
    },
  },
  add: {
    gridArea: 'add',
  },
  overview: {
    gridArea: 'overview',
  },
}));

type FormAddExpenses = {
  amount: number;
  time: string;
};

const Expenses = () => {
  const classes = useStyles();
  const [auth, isAuthLoading] = useAuth();
  const { handleSubmit, errors, control, setError, reset } = useForm<FormAddExpenses>();
  const [isDbLoading, setIsDbLoading] = useState(true);
  const [months, setMonths] = useState<IExpense_month[]>([]);
  const [openMonth, setOpenMonth] = useState<number | null>(null);

  useEffect(() => {
    if (auth && !isAuthLoading) {
      db.collection('expenses')
        .doc(auth.uid)
        .collection('expense_months')
        .onSnapshot((docs) => {
          const newMonths: IExpense_month[] = [];
          docs.forEach((doc) => {
            newMonths.push(doc.data() as IExpense_month);
          });
          setMonths(newMonths);
          setIsDbLoading(false);
        });
    }
  }, [auth, isAuthLoading]);

  const addExpense = (data: FormAddExpenses) => {
    if (!auth) {
      return;
    }
    if (data.amount < 0) {
      setError('amount', {
        type: 'manual',
        message: 'Summen må være over 0',
      });
      return;
    }
    const month = data.time.substring(0, 4) + data.time.substring(5, 7);
    const expense: IExpense = { time: firebase.firestore.Timestamp.fromDate(new Date(data.time)), amount: Number(data.amount) };
    db.collection('expenses')
      .doc(auth.uid)
      .collection('expense_months')
      .doc(month)
      .set(
        {
          month: month,
          totalTimes: firebase.firestore.FieldValue.increment(1),
          totalAmount: firebase.firestore.FieldValue.increment(Number(data.amount)),
          expenses: firebase.firestore.FieldValue.arrayUnion(expense),
        },
        { merge: true },
      )
      .then(() => reset());
  };

  const deleteExpense = (month: number, expense: IExpense) => {
    if (!auth) {
      return;
    }
    db.collection('expenses')
      .doc(auth.uid)
      .collection('expense_months')
      .doc(String(month))
      .update({
        month: month,
        totalTimes: firebase.firestore.FieldValue.increment(-1),
        totalAmount: firebase.firestore.FieldValue.increment(-expense.amount),
        expenses: firebase.firestore.FieldValue.arrayRemove(expense),
      });
  };

  const getFormattedDateValue = (date: Date) => {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  };

  return (
    <Navigation footer isLoading={Boolean(isAuthLoading || isDbLoading)}>
      <Root>
        <Typography variant='h1'>Utgifter</Typography>
        <div className={classes.content}>
          <div className={classes.add}>
            <Paper outlined>
              <form onSubmit={handleSubmit(addExpense)}>
                <Typography variant='h2'>Legg til utgift</Typography>
                <Controller
                  as={TextField}
                  className={classes.field}
                  control={control}
                  defaultValue='0'
                  error={Boolean(errors.amount)}
                  fullWidth
                  helperText={errors.amount?.message}
                  label='Sum'
                  name='amount'
                  required
                  rules={{ required: 'Feltet er påkrevd' }}
                  type='number'
                  variant='outlined'
                />
                <Controller
                  as={TextField}
                  className={classes.field}
                  control={control}
                  defaultValue={getFormattedDateValue(new Date())}
                  error={Boolean(errors.time)}
                  fullWidth
                  helperText={errors.time?.message}
                  label='Når'
                  name='time'
                  required
                  rules={{ required: 'Feltet er påkrevd' }}
                  type='date'
                  variant='outlined'
                />
                <Button color='primary' fullWidth type='submit' variant='contained'>
                  Legg til
                </Button>
              </form>
            </Paper>
          </div>
          <div className={classes.overview}>
            <Paper outlined>
              <Typography variant='h2'>Oversikt</Typography>
              <List>
                {months
                  .sort((a, b) => b.month - a.month)
                  .map((month, index) => (
                    <React.Fragment key={month.month}>
                      <ListItem
                        button
                        onClick={() => {
                          setOpenMonth(openMonth === month.month ? null : month.month);
                        }}>
                        <ListItemIcon>
                          <MonthIcon color='primary' />
                        </ListItemIcon>
                        <ListItemText
                          primary={getFormattedDate(numberToDate(month.month), false, false, false)}
                          secondary={'Utgifter: ' + month.totalAmount + ' kr'}
                        />
                        {openMonth === month.month ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={openMonth === month.month} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                          {month.expenses
                            .sort((a, b) => b.time.toMillis() - a.time.toMillis())
                            .map((expense, index) => (
                              <React.Fragment key={index}>
                                <Divider component='li' variant='inset' />
                                <ListItem className={classes.nested} key={index}>
                                  <ListItemIcon>
                                    <MoneyIcon color='secondary' />
                                  </ListItemIcon>
                                  <ListItemText primary={expense.amount + ' kr - ' + getFormattedDate(expense.time.toDate(), false)} />
                                  <ListItemSecondaryAction>
                                    <IconButton aria-label='delete' edge='end' onClick={() => deleteExpense(month.month, expense)}>
                                      <DeleteIcon color='secondary' />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              </React.Fragment>
                            ))}
                        </List>
                      </Collapse>
                      {index !== months.length - 1 && <Divider component='li' variant='inset' />}
                    </React.Fragment>
                  ))}
              </List>
            </Paper>
          </div>
        </div>
      </Root>
    </Navigation>
  );
};

export default Expenses;
