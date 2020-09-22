import React, {useEffect} from 'react';
import Board from './components/Board';
import useSound from 'use-sound';
import boopSfx from './components/Canon.mp3';

function App() {

  const [play] = useSound(boopSfx);

  useEffect(() => {
		play()
	}, [])

  return (
    <div className="App">
      <button onClick={play}>boop</button>
      <Board/>
    </div>
  );
}

export default App;
