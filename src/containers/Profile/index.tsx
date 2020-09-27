import React, { useState } from 'react';
import firebase, { fbAuth } from '../../firebase';
import { useAuth } from 'hooks/Auth';
import { useSnackbar } from 'context/SnackbarContext';
import { useTheme } from 'context/ThemeContext';
import { THEME } from 'types/Enums';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// Project components
import Paper from 'components/layout/Paper';
import Root from 'components/layout/Root';

const useStyles = makeStyles(() => ({
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
  const [auth] = useAuth();
  const theme = useTheme();
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [themeName, setThemeName] = useState<string>(theme.getEnum());

  const signUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      auth
        .linkWithCredential(credential)
        .then(() => {
          showSnackbar('Brukeren ble opprettet og arbeidet ditt knyttet til den');
          setIsLogIn(true);
        })
        .catch((error) => {
          showSnackbar(error.message);
        });
    } else {
      showSnackbar('Noe gikk galt, last inn siden på nytt og prøv igjen');
    }
  };

  const logIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fbAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showSnackbar('Logget inn');
      })
      .catch((error) => showSnackbar(error.code + ' - ' + error.message));
  };

  const signOut = () => {
    fbAuth.signOut();
  };

  const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeName(e.target.value);
    theme.set(e.target.value);
  };

  return (
    <>
      {auth && (
        <Root>
          <Typography variant='h1'>Profil</Typography>
          <Paper className={classes.paper} outlined>
            {auth.isAnonymous ? (
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type='email'
                  value={email}
                  variant='filled'
                />
                <TextField
                  className={classes.field}
                  fullWidth
                  label='Passord'
                  onChange={(e) => setPassword(e.target.value)}
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
              <>
                <Typography variant='h2'>Du er logget inn med: {auth.email}</Typography>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>Tema</FormLabel>
                  <RadioGroup aria-label='gender' name='gender1' onChange={changeTheme} value={themeName}>
                    <FormControlLabel control={<Radio color='primary' />} label='Lyst' value={THEME.LIGHT} />
                    <FormControlLabel control={<Radio color='primary' />} label='Automatisk' value={THEME.AUTOMATIC} />
                    <FormControlLabel control={<Radio color='primary' />} label='Mørkt' value={THEME.DARK} />
                  </RadioGroup>
                </FormControl>
                <Button className={classes.field} color='primary' fullWidth onClick={signOut} variant='outlined'>
                  Logg ut
                </Button>
              </>
            )}
          </Paper>
        </Root>
      )}
    </>
  );
};

export default Profile;
