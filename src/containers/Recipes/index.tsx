import { useEffect, useState } from 'react';
import firebase, { db } from '../../firebase';
import { useAuth } from 'hooks/Auth';
import { useSnackbar } from 'context/SnackbarContext';
import { IRecipes } from 'types/Firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import URLS from 'URLS';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FoodIcon from '@material-ui/icons/FastfoodRounded';

// Project components
import Paper from 'components/layout/Paper';
import Root from 'components/layout/Root';
import Dialog from 'components/layout/Dialog';
import TextField from 'components/input/TextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 20,
  },
  avatar: {
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  button: {
    marginTop: 10,
    height: 50,
  },
}));

const Form = () => {
  const classes = useStyles();
  const [auth] = useAuth();
  const { control, register, errors, handleSubmit } = useForm<Pick<IRecipes, 'img' | 'ingredients' | 'steps' | 'title'>>();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const createRecipe = async (data: Pick<IRecipes, 'public' | 'img' | 'ingredients' | 'steps' | 'title'>) => {
    if (!auth) {
      return;
    }
    setIsLoading(true);
    try {
      const newDoc = await db.collection('recipes').add({ ...data, public: false, owner: auth.uid });
      showSnackbar('Oppskriften ble opprettet');
      navigate(`${URLS.recipes}${newDoc.id}/`);
    } catch (e) {
      showSnackbar(e.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button className={classes.button} color='primary' fullWidth onClick={() => setDialogOpen(true)} variant='outlined'>
        Ny oppskrift
      </Button>
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen} titleText='Ny oppskrift'>
        <form onSubmit={handleSubmit(createRecipe)}>
          <FormControlLabel
            control={
              <Controller
                control={control}
                name='public'
                // eslint-disable-next-line react/prop-types
                render={(props) => <Switch checked={props.value} color='primary' onChange={(e) => props.onChange(e.target.checked)} />}
              />
            }
            label='Åpent tilgjengelig for alle'
          />
          <TextField
            disabled={isLoading}
            errors={errors}
            label='Tittel'
            name='title'
            register={register}
            required
            rules={{ required: 'Feltet kan ikke være tomt' }}
          />
          <TextField disabled={isLoading} errors={errors} label='Bilde-url' name='img' register={register} />
          <TextField
            disabled={isLoading}
            errors={errors}
            helperText='Skill ingrediensene med semikolon (;)'
            label='Ingredienser'
            name='ingredients'
            register={register}
          />
          <TextField
            disabled={isLoading}
            errors={errors}
            helperText='Skill stegene med semikolon (;)'
            label='Steg'
            multiline
            name='steps'
            register={register}
            rows={4}
          />
          <Button className={classes.button} color='primary' disabled={isLoading} fullWidth type='submit' variant='contained'>
            Lag oppskrift
          </Button>
        </form>
      </Dialog>
    </>
  );
};

const Recipes = () => {
  const classes = useStyles();
  const [auth] = useAuth();
  const [recipes, setRecipes] = useState<Array<firebase.firestore.DocumentSnapshot>>([]);

  useEffect(() => {
    if (!auth) {
      return;
    }
    let subscribed = true;
    db.collection('recipes')
      .where('owner', '==', auth.uid)
      .get()
      .then((snapshot) => !subscribed || setRecipes(snapshot.docs));
    return () => {
      subscribed = false;
    };
  }, [auth]);

  return (
    <Root>
      <Typography variant='h1'>Oppskrifter</Typography>
      <Paper className={classes.paper} outlined>
        <List disablePadding>
          {recipes.map((recipe) => (
            <ListItem button component={Link} divider={recipe.id !== recipes[recipes.length - 1].id} key={recipe.id} to={`${URLS.recipes}${recipe.id}/`}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <FoodIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={(recipe.data() as IRecipes).title} />
            </ListItem>
          ))}
        </List>
        <Form />
      </Paper>
    </Root>
  );
};

export default Recipes;
