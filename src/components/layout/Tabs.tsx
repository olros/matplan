import React from 'react';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme: Theme) => ({
  tabsRoot: {
    borderBottom: '1px solid #C3CFDD',
    marginBottom: 10,
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    height: 3,
  },
  tabRoot: {
    textTransform: 'none',
    fontSize: '0.9rem',
    minWidth: 92,
    color: theme.palette.colors.text.primary,
    '&:hover': {
      color: theme.palette.secondary.main,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.primary.main,
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
  selected: {},
  icon: {
    verticalAlign: 'middle',
    marginRight: 7,
    marginBottom: 3,
  },
}));

function a11yProps(value: string | number) {
  return {
    id: `simple-tab-${value}`,
    'aria-controls': `tabpanel-${value}`,
  };
}

interface Item {
  value: string | number;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

interface Props {
  items: Array<Item>;
  selectedTab: string | number;
  setSelectedTab: (n: string | number) => void;
}

function Tabs({ items, selectedTab, setSelectedTab }: Props) {
  const classes = useStyles();

  return (
    <MaterialTabs
      aria-label='Tabs'
      classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
      onChange={(e, newTab) => setSelectedTab(newTab)}
      value={selectedTab}
      variant='scrollable'>
      {items.map((item, index) => (
        <Tab
          classes={{ root: classes.tabRoot, selected: classes.selected }}
          key={index}
          label={
            <div>
              {item.icon && <item.icon className={classes.icon} />}
              {item.label}
            </div>
          }
          value={item.value}
          {...a11yProps(item.value)}
        />
      ))}
    </MaterialTabs>
  );
}

export default Tabs;
