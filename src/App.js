import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './common/NavigationBar';
import Home from './home/Home';
import ReservationPage from './reservation/ReservationPage';
import Signup from './Signup/Signup';

const App = () => (
    <>
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/reservation" component={ReservationPage} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </Router>
    </>
);

export default App;
