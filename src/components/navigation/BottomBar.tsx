import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import URLS from 'URLS';
import { useAuth } from 'hooks/Auth';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';

// Icons
import PlanIcon from '@material-ui/icons/ViewDayOutlined';
import ExpensesIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import RecipesIcon from '@material-ui/icons/FastfoodRounded';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navbar: {
    background: theme.palette.colors.background.primaryLight,
    height: 64,
  },
  action: {
    color: theme.palette.colors.text.secondary,
    padding: 12,
    '&$selected': {
      color: theme.palette.colors.text.main,
      paddingTop: 10,
    },
  },
  selected: {
    // This must be empty to override the selected style
  },
  spacing: {
    height: 50,
  },
}));

const BottomBar = () => {
  const classes = useStyles();
  const [auth, isLoading] = useAuth();
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <>
      <Paper className={classes.root} elevation={5}>
        <BottomNavigation className={classes.navbar} onChange={(event, newValue) => setTab(newValue)} showLabels value={tab}>
          <BottomNavigationAction
            classes={{ root: classes.action, selected: classes.selected }}
            component={Link}
            icon={<PlanIcon />}
            label='Plan'
            to={URLS.plan}
            value={URLS.plan}
          />
          <BottomNavigationAction
            classes={{ root: classes.action, selected: classes.selected }}
            component={Link}
            icon={<ExpensesIcon />}
            label='Utgifter'
            to={URLS.expenses}
            value={URLS.expenses}
          />
          <BottomNavigationAction
            classes={{ root: classes.action, selected: classes.selected }}
            component={Link}
            icon={<RecipesIcon />}
            label='Oppskrifter'
            to={URLS.recipes}
            value={URLS.recipes}
          />
          <BottomNavigationAction
            classes={{ root: classes.action, selected: classes.selected }}
            component={Link}
            icon={<AccountIcon />}
            label={!isLoading && !auth.isAnonymous ? 'Profil' : 'Logg inn'}
            to={URLS.profile}
            value={URLS.profile}
          />
        </BottomNavigation>
      </Paper>
      <div className={classes.spacing} />
    </>
  );
};

export default BottomBar;
