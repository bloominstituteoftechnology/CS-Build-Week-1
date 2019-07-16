import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  variables: {},
  navLinks: {},
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1800
    }
  },
  palette: {
    a: {
      // teal
      light: '#8bffff',
      main: '#53d3d1',
      dark: '#00a1a0',
      xdark: '#006666'
    },
    // pink
    b: {
      light: '#ffffff',
      main: '#FBECEB',
      dark: '#c8bab9'
    },
    alive: 'black',
    dead: 'white'
  }
});
