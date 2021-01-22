import { useEffect, useState } from 'react';
import classnames from 'classnames';
import firebase, { db } from '../../firebase';
import { useAuth } from 'hooks/Auth';
import { useSnackbar } from 'context/SnackbarContext';
import { IRecipes } from 'types/Firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridGap: 20,
    alignItems: 'self-start',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: 0,
    },
  },
  avatar: {
    background: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
    },
    height: 50,
  },
  addButton: {
    marginBottom: 10,
  },
  primaryText: {
    textTransform: 'capitalize',
  },
  img: {
    maxHeight: 200,
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
    marginTop: 20,
  },
}));

type IProps = {
  recipe: IRecipes;
  id: string;
  setRecipeData: (recipe: IRecipes) => void;
};

const Form = ({ id, recipe, setRecipeData }: IProps) => {
  const classes = useStyles();
  const [auth] = useAuth();
  const { register, errors, handleSubmit } = useForm<Pick<IRecipes, 'img' | 'ingredients' | 'steps' | 'title'>>({ defaultValues: recipe });
  const { showSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const updateRecipe = async (data: Pick<IRecipes, 'img' | 'ingredients' | 'steps' | 'title'>) => {
    if (!auth) {
      return;
    }
    setIsLoading(true);
    try {
      await db
        .collection('recipes')
        .doc(id)
        .update({ ...data });
      showSnackbar('Oppskriften ble oppdatert');
      setRecipeData({ ...recipe, ...data });
      setDialogOpen(false);
    } catch (e) {
      showSnackbar(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button className={classes.button} color='primary' fullWidth onClick={() => setDialogOpen(true)} variant='outlined'>
        Endre oppskrift
      </Button>
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen} titleText='Ny oppskrift'>
        <form onSubmit={handleSubmit(updateRecipe)}>
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
            helperText='Skill ingrediensene med komma'
            label='Ingredienser'
            name='ingredients'
            register={register}
          />
          <TextField
            disabled={isLoading}
            errors={errors}
            helperText='Skill stegene med komma'
            label='Steg'
            multiline
            name='steps'
            register={register}
            rows={4}
          />
          <Button className={classes.button} color='primary' disabled={isLoading} fullWidth type='submit' variant='contained'>
            Lagre oppskrift
          </Button>
        </form>
      </Dialog>
    </>
  );
};

const RecipeDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [auth] = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState<IRecipes | null>(null);

  useEffect(() => {
    if (!auth) {
      return;
    }
    let subscribed = true;
    db.collection('recipes')
      .doc(id)
      .get()
      .then((snapshot) => (!subscribed || snapshot.exists ? setRecipeData(snapshot.data() as IRecipes) : navigate(URLS.recipes)));
    return () => {
      subscribed = false;
    };
  }, [auth, id, navigate]);

  const addIngredientsToShoppingList = () => {
    if (!auth || !recipeData) {
      return;
    }
    const items = recipeData.ingredients.split(',').map((ingredient) => ({ what: ingredient, checked: false }));
    db.collection('shoppinglists')
      .doc(auth.uid)
      .update({ items: firebase.firestore.FieldValue.arrayUnion(...items) });
    showSnackbar('Ingrediensene ble lagt til i handlelisten din');
  };

  return (
    <Root>
      <Typography variant='h1'>{recipeData?.title || 'Laster...'}</Typography>
      {recipeData && (
        <>
          {recipeData.img && <img alt={recipeData.title} className={classes.img} src={recipeData.img} width='100%' />}
          <div className={classes.content}>
            <div>
              <Paper className={classes.paper} outlined>
                <Typography variant='h3'>Ingredienser</Typography>
                <List disablePadding>
                  {recipeData.ingredients.split(',').map((ingredient, i) => (
                    <ListItem divider={i !== recipeData.ingredients.split(',').length - 1} key={i}>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          <FoodIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText classes={{ primary: classes.primaryText }} primary={ingredient} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Button
                className={classnames(classes.button, classes.addButton)}
                color='primary'
                fullWidth
                onClick={addIngredientsToShoppingList}
                variant='contained'>
                Legg til ingredienser i handlelisten
              </Button>
              {auth?.uid === recipeData.owner && <Form id={id} recipe={recipeData} setRecipeData={setRecipeData} />}
            </div>
            <Paper className={classes.paper} outlined>
              <Typography variant='h2'>Steg</Typography>
              <List disablePadding>
                {recipeData.steps.split(',').map((step, i) => (
                  <ListItem divider={i !== recipeData.steps.split(',').length - 1} key={i}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>{i + 1}</Avatar>
                    </ListItemAvatar>
                    <ListItemText classes={{ primary: classes.primaryText }} primary={step} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </div>
        </>
      )}
    </Root>
  );
};

export default RecipeDetails;
