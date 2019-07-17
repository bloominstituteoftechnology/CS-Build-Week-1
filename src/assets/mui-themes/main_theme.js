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
    main: 'white',
    alive: {
      // green
      a: '#00ff00',
      b: '#00e600',
      c: '#00cc00',
      d: '#00b300'
    },
    // blue
    dead: {
      a: '#00ffff',
      b: '#00e6e6',
      c: '#00cccc',
      d: '#00b3b3'
    }
  }
});
