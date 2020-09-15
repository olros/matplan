import React, { useEffect, useCallback, useState } from 'react';
import { db } from '../../firebase';
import { useAuth } from 'hooks/Auth';
import { IShoppinglist, IShoppinglistItem } from 'types/Firestore';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

// Icons
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';

// Project components
import Paper from 'components/layout/Paper';
import Root from 'components/layout/Root';
import Navigation from 'components/navigation/Navigation';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 20,
  },
  item: {
    display: 'grid',
    gridGap: 8,
    gridTemplateColumns: '56px 1fr 44px',
    margin: '8px 0',
  },
  button: {
    marginTop: 10,
    height: 56,
  },
}));

interface ItemProps {
  item: IShoppinglistItem;
  updateItem: (what: string, checked: boolean, index: number) => void;
  deleteItem: (index: number) => void;
  index: number;
}

const Item = ({ item, updateItem, deleteItem, index }: ItemProps) => {
  const classes = useStyles();
  const [what, setWhat] = useState<string>(item?.what || '');
  const [checked, setChecked] = useState<boolean>(item?.checked || false);
  useEffect(() => updateItem(what, checked, index), [what, checked, index]);
  useEffect(() => {
    setWhat(item.what);
    setChecked(item.checked);
  }, [item]);

  return (
    <div className={classes.item}>
      <Checkbox checked={checked} color='primary' inputProps={{ 'aria-label': 'primary checkbox' }} onChange={(e) => setChecked(e.target.checked)} />
      <TextField fullWidth onChange={(e) => setWhat(e.target.value)} placeholder='Hva' value={what} variant='outlined' />
      <IconButton aria-label='delete' edge='end' onClick={() => deleteItem(index)}>
        <DeleteIcon color='secondary' />
      </IconButton>
    </div>
  );
};

const Shoppinglist = () => {
  const classes = useStyles();
  const [auth, isAuthLoading] = useAuth();
  const [isDbLoading, setIsDbLoading] = useState(true);
  const [items, setItems] = useState<IShoppinglistItem[]>([]);

  useEffect(() => {
    if (auth && !isAuthLoading) {
      db.collection('shoppinglists')
        .doc(auth.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data() as IShoppinglist;
            setItems([...data.items]);
            setIsDbLoading(false);
          } else {
            db.collection('shoppinglists').doc(auth.uid).set({
              uid: auth.uid,
              public: false,
              items: [],
            });
          }
        });
    }
  }, [auth, isAuthLoading]);

  useEffect(() => {
    const unsub = setTimeout(() => {
      if (auth && !isAuthLoading && !isDbLoading) {
        db.collection('shoppinglists').doc(auth.uid).update({ items: items });
      }
    }, 500);
    return () => clearTimeout(unsub);
  }, [items, auth, isAuthLoading, isDbLoading]);

  const updateItem = useCallback(
    (what: string, checked: boolean, index: number) => {
      const newItems = [...items];
      if (index > -1) {
        newItems[index] = { ...newItems[index], what: what, checked: checked };
        setItems([...newItems]);
      }
    },
    [items],
  );

  const addItem = () => {
    setItems([...items, { what: '', checked: false }]);
  };

  const deleteItem = (index: number) => {
    const newItems = [...items];
    if (index > -1) {
      newItems.splice(index, 1);
      setItems([...newItems]);
    }
  };

  return (
    <Navigation footer isLoading={Boolean(isAuthLoading) || isDbLoading}>
      <Root>
        <Typography variant='h1'>Handleliste</Typography>
        <Paper className={classes.paper} outlined>
          {items.map((item, index) => (
            <Item deleteItem={deleteItem} index={index} item={item} key={index} updateItem={updateItem} />
          ))}
          <Button className={classes.button} color='primary' fullWidth onClick={addItem} variant='contained'>
            Legg til
          </Button>
        </Paper>
      </Root>
    </Navigation>
  );
};

export default Shoppinglist;
