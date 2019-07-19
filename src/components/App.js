import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import theme from '../assets/mui_theme';
import GameOfLife from './GameOfLife';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GameOfLife />
    </ThemeProvider>
  );
}

export default App;
