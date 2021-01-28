import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './common/NavigationBar';
import Home from './home/Home';
import ReservationPage from './reservation/ReservationPage';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Admin from './Admin/Admin';
import Store from './Store';
import ErrorDialog from './common/ErrorDialog';

const App = () => (
    <Store>
        <Router>
            <NavigationBar />
            <ErrorDialog />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/reservation" component={ReservationPage} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/admin" component={Admin} />
            </Switch>
        </Router>
    </Store>
);

export default App;
