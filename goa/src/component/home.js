import React, { Component } from 'react';
import Game from './mainGame';

;

class Home extends Component {
    render() {
        return(
            <React.Fragment>    
                <div className="wrapper-home">                
                    <header>                    
                        <h1>Conway's Game of Life</h1>
                    </header>
                    <main className="content">
                        <section className="left">
                            <h3>Generation: `{'${}'}`</h3>
                            <div className="wrapper-game">

                                <Game />

                            </div>
                            <span className="control">
                                <button>Play</button>                        
                                <button>Pause</button>                      
                                <button>Stop</button>  
                            </span>                      
                        </section>
                        
                        
                    </main>                     
                    
                </div>      
            </React.Fragment>  
        );
    }
}
export default Home;