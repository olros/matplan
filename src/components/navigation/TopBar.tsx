import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import URLS from '../../URLS';
import { useAuth } from '../../hooks/Auth';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// Icons
import ExpensesIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import RecipesIcon from '@material-ui/icons/FastfoodRounded';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import PlanIcon from '@material-ui/icons/ViewDayOutlined';

const useStyles = makeStyles((theme: Theme) => ({
  navContent: {
    width: '100%',
    zIndex: -1,
  },
  navWrapper: {
    width: '100%',
    padding: '0 10px',
    display: 'flex',
    maxWidth: theme.palette.constants.maxWidth,
    margin: 'auto',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
  },
  logoWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginRight: 10,
    '@media only screen and (max-width: 600px)': {
      paddingLeft: 15,
    },
  },
  menuButton: {
    color: theme.palette.colors.text.main,
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
    padding: 15,
  },
}));

interface URIButtonProps {
  data: {
    link: string;
    text: string;
    icon: ReactNode;
  };
}

const URIbutton = ({ data }: URIButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      color='secondary'
      component={Link}
      onClick={() => (data.link === window.location.pathname ? window.location.reload() : {})}
      startIcon={data.icon}
      to={data.link}
      variant={window.location.pathname === data.link ? 'contained' : 'text'}>
      {data.text}
    </Button>
  );
};

function NavBar() {
  const classes = useStyles();
  const [auth, isLoading] = useAuth();

  return (
    <>
      <div className={classes.navWrapper}>
        <div className={classes.grow}>
          <URIbutton data={{ link: URLS.plan, text: 'Plan', icon: <PlanIcon /> }} />
          <URIbutton data={{ link: URLS.expenses, text: 'Utgifter', icon: <ExpensesIcon /> }} />
          <URIbutton data={{ link: URLS.recipes, text: 'Oppskrifter', icon: <RecipesIcon /> }} />
        </div>

        <div>
          <IconButton className={classes.menuButton} component={Link} to={!isLoading && auth ? URLS.profile : URLS.sign_in}>
            <AccountIcon />
          </IconButton>
        </div>
      </div>
      <Toolbar className={classes.navContent} disableGutters />
    </>
  );
}

export default NavBar;
