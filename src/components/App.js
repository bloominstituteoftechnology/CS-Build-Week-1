import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import theme from '../assets/mui-themes/main_theme';
// import GameOfLife from './GameOfLife';
import GameOfLifeCanvas from './GameOfLifeCanvas';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <GameOfLife /> */}
      <GameOfLifeCanvas />
    </ThemeProvider>
  );
}

export default App;
