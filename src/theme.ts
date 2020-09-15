import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    colors: {
      background: {
        primary: string;
        primaryLight: string;
        secondary: string;
        white: string;
      };
      text: {
        main: string;
        primary: string;
        secondary: string;
      };
    };
    constants: {
      maxWidth: number;
      breakWidth: number;
    };
  }

  interface PaletteOptions {
    colors?: {
      background: {
        primary: string;
        primaryLight: string;
        secondary: string;
        white: string;
      };
      text: {
        main: string;
        primary: string;
        secondary: string;
      };
    };
    constants?: {
      maxWidth?: number;
      breakWidth?: number;
    };
  }
}
const constants = {
  maxWidth: 1000,
  breakWidth: 750,
};

export const darkTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: constants.breakWidth,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: '"Krub", "Roboto", "Helvetica", sans-serif',
    h1: {
      color: '#132536',
      textAlign: 'left',
      fontWeight: 700,
      fontSize: '3.5rem',
      marginTop: 'auto',
      marginBottom: 'auto',
      whiteSpace: 'normal',
      ['@media only screen and (max-width: ' + constants.breakWidth + 'px)']: {
        fontSize: '3rem',
      },
    },
    h2: {
      color: '#111111',
      textAlign: 'left',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginTop: 15,
      marginBottom: 10,
    },
    h3: {
      color: '#476282',
      textAlign: 'left',
      fontSize: '1.2rem',
      marginTop: 10,
      marginBottom: 5,
    },
    h4: {
      color: '#476282',
      textAlign: 'left',
      marginTop: 10,
      marginBottom: 5,
      fontSize: '0.9rem',
    },
  },
  palette: {
    primary: {
      main: '#015551',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#18191a',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#B71C1C',
      contrastText: '#ffffff',
    },
    type: 'light',
    colors: {
      background: {
        primary: '#f1f0f5',
        primaryLight: '#e2e2e2',
        secondary: '#ffffff',
        white: '#ffffff',
      },
      text: {
        main: '#111111',
        primary: '#1B3A57',
        secondary: '#476282',
      },
    },
    constants: {
      ...constants,
    },
  },
});
