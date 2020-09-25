import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    colors: {
      background: {
        primary: string;
        primaryLight: string;
        secondary: string;
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

export const getTheme = (light: boolean) =>
  createMuiTheme({
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
        color: light ? '#132536' : '#ffffff',
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
        color: light ? '#111111' : '#fafafa',
        textAlign: 'left',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
      },
      h3: {
        color: light ? '#476282' : '#f8f8f8',
        textAlign: 'left',
        fontSize: '1.2rem',
        marginTop: 10,
        marginBottom: 5,
      },
      h4: {
        color: light ? '#476282' : '#f8f8f8',
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 5,
        fontSize: '0.9rem',
      },
    },
    palette: {
      primary: {
        main: light ? '#015551' : '#09d3ac',
        contrastText: light ? '#FFFFFF' : '#000000',
      },
      secondary: {
        main: light ? '#18191a' : '#a7a7a7',
        contrastText: light ? '#FFFFFF' : '#ffffff',
      },
      error: {
        main: '#B71C1C',
        contrastText: '#ffffff',
      },
      type: light ? 'light' : 'dark',
      colors: {
        background: {
          primary: light ? '#f1f0f5' : '#121212',
          primaryLight: light ? '#e2e2e2' : '#1e2125',
          secondary: light ? '#ffffff' : '#292d3e',
        },
        text: {
          main: light ? '#111111' : '#ffffff',
          primary: light ? '#1B3A57' : '#fafafa',
          secondary: light ? '#476282' : '#b4b4b4',
        },
      },
      constants: {
        ...constants,
      },
    },
  });
