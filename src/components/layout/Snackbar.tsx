import React, { useState } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    ['@media only screen and (max-width: ' + theme.palette.constants.breakWidth + 'px)']: {
      bottom: 75,
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexGrow: 1,
    backgroundColor: '#e6e6e6',
    '@media only screen and (min-width: 600px)': {
      flexGrow: 'initial',
      minWidth: 344,
    },
  },
  title: {
    fontWeight: 'bold',
  },
  actionRoot: {
    padding: '8px 8px 8px 16px',
  },
  icons: {
    marginLeft: 'auto !important',
  },
  expand: {
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    padding: 16,
  },
  button: {
    textTransform: 'none',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  body: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  img: {
    maxHeight: 250,
    width: 'auto',
    objectFit: 'contain',
    marginTop: 15,
    borderRadius: 4,
  },
}));

interface Props {
  open: boolean;
  close: () => void;
  title: string;
  options?: {
    length?: number;
    body?: string;
    click_action?: string;
    image?: string;
  };
}

function Snackbar({ open, close, title, options = {} }: Props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const closeSnack = () => {
    setExpanded(false);
    close();
  };

  return (
    <MaterialSnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={options.length || 6000}
      className={classes.snackbar}
      onClose={closeSnack}
      open={open}>
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          <Typography className={classes.title} variant='subtitle2'>
            {title}
          </Typography>
          <div className={classes.icons}>
            {options.body && (
              <IconButton
                aria-label='Show more'
                className={classnames(classes.expand, { [classes.expandOpen]: expanded })}
                onClick={() => setExpanded(!expanded)}>
                <ExpandMoreIcon />
              </IconButton>
            )}
            <IconButton className={classes.expand} onClick={closeSnack}>
              <CloseIcon />
            </IconButton>
          </div>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Paper className={classes.collapse}>
            <div className={classes.flex}>
              <Typography className={classes.body}>{options.body}</Typography>
              {options.click_action && (
                <Button className={classes.button} component={Link} onClick={closeSnack} to={options.click_action}>
                  Åpne
                </Button>
              )}
            </div>
            {options.image && <img alt={title} className={classes.img} src={options.image} width='100%' />}
          </Paper>
        </Collapse>
      </Card>
    </MaterialSnackbar>
  );
}

export default Snackbar;
