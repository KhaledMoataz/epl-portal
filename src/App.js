import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './common/NavigationBar';
import Home from './home/Home';
import Reservation from './reservation/Reservation';
import Signup from './Signup/Signup';
import Login from './Login/Login';

const App = () => (
    <>
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/reservation" component={Reservation} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    </>
);

export default App;
