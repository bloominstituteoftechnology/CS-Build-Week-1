import React, {useEffect} from 'react';
import Board from './components/Board';
import useSound from 'use-sound';
import boopSfx from './components/Canon.mp3';
import Footer from './components/Footer'

function App() {

  const [boop] = useSound(boopSfx);

  useEffect(() => {
		boop();
	}, [])

  return (
    <div className="App">
      {/* <button onClick={boop}>boop</button> */}
      <Board boop={boop}/>
      <Footer/>
    </div>
  );
}

export default App;
