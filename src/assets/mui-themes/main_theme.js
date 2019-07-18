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
      a: '#00ffd5',
      b: '#24ffd9',
      c: '#40ffde',
      d: '#5effe3',
      e: '#87ffeb',
      f: '#adfff1',
      g: '#c4fff5',
      h: '#dbfff9',
      i: '#ffffff'
    },
    // blue
    dead: {
      a: '#0000ff',
      b: '#0000e3',
      c: '#0000c4',
      d: '#0000a8',
      e: '#00008a',
      f: '#000066',
      g: '#00004a',
      h: '#00002e',
      i: '#000000'
    }
  }
});
