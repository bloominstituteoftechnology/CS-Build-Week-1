import React from "react";
import Grid from './components/grid.js'
import Header from './components/header.js'
import Description from './components/description.js'

import './App.css';

function App () {

  return (
    <div className='App'>
      <Header />
      <Grid />
      <Description />
    </div>
  );
};

export default App;