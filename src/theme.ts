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
    };
  }
}

export const darkTheme = createMuiTheme({
  typography: {
    fontFamily: '"Krub", "Roboto", "Helvetica", sans-serif',
    h1: {
      color: '#132536',
      textAlign: 'left',
      fontWeight: 700,
      fontSize: '3rem',
      marginTop: 'auto',
      marginBottom: 'auto',
      whiteSpace: 'normal',
      '@media only screen and (max-width: 600px)': {
        fontSize: '2rem',
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
      color: '#111111',
      textAlign: 'left',
      fontSize: '1.1rem',
    },
    h4: {
      color: '#476282',
      textAlign: 'left',
      marginBottom: 10,
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
      maxWidth: 1000,
    },
  },
});
