import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './common/NavigationBar';
import Home from './home/Home';
import ReservationPage from './reservation/ReservationPage';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Profile from './Profile/Profile';

const App = () => (
    <>
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/reservation" component={ReservationPage} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </Router>
    </>
);

export default App;
