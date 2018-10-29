import React, { Component } from 'react';
import './App.css';
import Display from './components/Display';
import Home from './components/Home';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Display />
                    <Home />
                </header>
            </div>
        );
    }
}

export default App;

