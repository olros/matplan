import React, { useState } from 'react';
import firebase, { auth } from '../../firebase';
import { useAuth } from '../../hooks/Auth';
import { useSnackbar } from '../../context/SnackbarContext';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core/styles';

// Project components
import Paper from 'components/layout/Paper';
import Root from 'components/layout/Root';
import Navigation from '../../components/navigation/Navigation';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: 20,
  },
  field: {
    margin: '8px 0',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { showSnackbar } = useSnackbar();
  const [auth, isLoading] = useAuth();
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const a = auth as firebase.User;
  const signUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    console.log(credential);
    showSnackbar('hmm');
  };

  const logIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => showSnackbar(error.code + ' - ' + error.message));
  };

  return (
    <Navigation footer isLoading={Boolean(isLoading)}>
      {auth && (
        <Root>
          <Typography variant='h1'>Profil</Typography>
          <Paper className={classes.paper}>
            {a.isAnonymous ? (
              <form onSubmit={isLogIn ? logIn : signUp}>
                <Typography variant='h2'>{isLogIn ? 'Logg inn' : 'Opprett bruker'}</Typography>
                <Typography variant='h4'>
                  Logg inn for å finne din matplan, utgifter og matoppskrifter fra andre enheter. Opprett en bruker for å lagre det du har laget på denne
                  enheten
                </Typography>
                <TextField
                  className={classes.field}
                  fullWidth
                  label='Epost'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  type='email'
                  value={email}
                  variant='filled'
                />
                <TextField
                  className={classes.field}
                  fullWidth
                  label='Passord'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  type='password'
                  value={password}
                  variant='filled'
                />
                <Button className={classes.field} color='primary' fullWidth type='submit' variant='contained'>
                  {isLogIn ? 'Logg inn' : 'Opprett bruker'}
                </Button>
                <Button className={classes.field} color='secondary' fullWidth onClick={() => setIsLogIn(!isLogIn)} variant='outlined'>
                  {isLogIn ? 'Har du ikke bruker?' : 'Har du en bruker?'}
                </Button>
              </form>
            ) : (
              <Typography variant='h2'>Du er logget inn med: {a.email}</Typography>
            )}
          </Paper>
        </Root>
      )}
    </Navigation>
  );
};

export default Profile;
