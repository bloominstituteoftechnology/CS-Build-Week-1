import React from 'react';
import './Navigation.css';

class Navigation extends React.Component {
    render() {
        return(
            <div className='navigation'>
                <a href='#game'> Game </a>
                <a href='#options'> Options </a>
                <a href='#rules'> Rules </a>
                <a href='#about'> About </a>
            </div>
        )
    }
}
export default Navigation;