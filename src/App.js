import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './common/NavigationBar';
import Home from './home/Home';
import Reservation from './reservation/Reservation';

const App = () => (
    <>
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/reservation" component={Reservation} />
            </Switch>
        </Router>
    </>
);

export default App;
