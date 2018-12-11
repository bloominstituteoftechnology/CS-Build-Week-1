import React from 'react';

const Header = (props) => {
    return ( 
        <div className = 'header'>
            <h1>Generation: {props.generation}</h1>
        </div>
     );
}
 
export default Header;