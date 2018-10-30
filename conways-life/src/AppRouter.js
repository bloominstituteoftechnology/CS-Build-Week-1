import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Two from './Two'
import Three from './Three'
import Main from './Main'

const AppRouter = () => (
    <Router>
        <div>
            <h1>Conway's Game of Life</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/two">View 2D Simulation</Link>
                    </li>
                    <li>
                        <Link to="/three">View 3D Simulation</Link>
                    </li>
                </ul>
            </nav>

            <Route path="/" exact component={Main} />
            <Route path="/two" component={Two} />
            <Route path="/three" component={Three} />
        </div>
    </Router>
)

export default AppRouter