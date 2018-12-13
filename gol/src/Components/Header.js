import React from 'react';

const Header = (props) => {
    return ( 
        <div className = 'header'>
        <h1>Game Of Life</h1>
            <h3>Generation: {props.generation}</h3>
        </div>
     );
}
 
export default Header;