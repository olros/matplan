import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { languages } from 'i18n';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: theme.palette.colors.background.primaryLight,
  },
  content: {
    maxWidth: theme.palette.constants.maxWidth,
    padding: '100px 0',
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    color: theme.palette.colors.text.main,
    margin: 'auto',

    '@media only screen and (max-width: 600px)': {
      gridTemplateRows: 'auto auto',
      gridTemplateColumns: '1fr',
    },
  },
  link: {
    textDecoration: 'underline',
    color: theme.palette.colors.text.main,
    fontWeight: 'bold',
  },
  button: {
    width: 'fit-content',
    minWidth: 100,
    margin: 'auto',
    marginTop: 20,
  },
  menuItem: {
    minWidth: 100,
  },
}));

function Footer() {
  // const { i18n } = useTranslation();
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const setLang = (code: string) => {
  // i18n.changeLanguage(code);
  // setAnchorEl(null);
  // };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
          {/* <Button
              aria-controls='language-menu'
              aria-haspopup='true'
              className={classes.button}
              color='secondary'
              onClick={(e) => setAnchorEl(e.currentTarget)}
              variant='outlined'>
              {languages.find((lang) => lang.code === i18n.language)?.name || 'Språk'}
            </Button>
            <Menu anchorEl={anchorEl} id='language-menu' keepMounted onClose={() => setAnchorEl(null)} open={Boolean(anchorEl)}>
              {languages.map((lang, i) => (
                <MenuItem className={classes.menuItem} key={i} onClick={() => setLang(lang.code)}>
                  {lang.name}
                </MenuItem>
              ))}
            </Menu> */}
          <a className={classes.link} href='https://github.com/olros/matplan'>
            <Typography align='center' color='inherit'>
              @olros
            </Typography>
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
