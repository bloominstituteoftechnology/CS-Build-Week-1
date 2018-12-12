import React from 'react';
import './Navigation.css';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: 'closed'
        }; 
        
        this.toggleNavigation = event => {
            event.preventDefault();
            if (this.state.navigation === 'closed') {
                this.setState({ navigation: 'is-active'})
            }
            this.setState({ navigation: 'closed'})

        }
    }
    componentDidMount() {

    }
    render() {
        return(
            <div className='navigation'>
                <a href='#game'> Game </a>
                <a href='#rules'> Rules </a>
                <a href='#about'> About </a>
            </div>
        )
    }
}
export default Navigation;