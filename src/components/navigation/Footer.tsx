// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: theme.palette.background.default,
  },
  content: {
    maxWidth: theme.palette.constants.maxWidth,
    padding: '100px 0',
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    color: theme.palette.text.primary,
    margin: 'auto',

    ['@media only screen and (max-width: ' + theme.palette.constants.breakWidth + 'px)']: {
      gridTemplateRows: 'auto auto',
      gridTemplateColumns: '1fr',
    },
  },
  link: {
    textDecoration: 'underline',
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
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
