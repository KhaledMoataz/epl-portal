import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import FormComponent from './FormComponent';
import { BASE_URL } from '../common/constants';

const endpoint = `${BASE_URL}/login/`;

/*  This file contains the form logic
    The form have 2 states to control the inputs and send thim to the server
        and 1 state to store the response from the the server
    We have 2 functions: 
        1- changeHandler:   to change the state when the input change
        2- submitHandler:   to submit the form inputs to the server
*/

class Form extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',

            user_message: null,
            pass_message: null
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(event) {
        const { name, value } = event.target;

        /*  This part to delete the error message when the user starts typing again.
            When the message state not null for specific item, the form item for this message
            presents it's content as error message below the item
        */
        if (name === 'username') this.setState({ user_message: null });
        else if (name === 'password') this.setState({ pass_message: null });

        this.setState({ [name]: value });
    }

    submitHandler(event) {
        event.preventDefault();

        const { cookies } = this.props;

        /* to don't send request again if the user didn't update the input after the error */
        if (this.state.user_message || this.state.pass_message) return;
        // console.log(JSON.stringify(this.state));

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => {
                // setting the token as cookie called jwt
                cookies.set('jwt', response.headers.get('jwt'), { path: '/' });

                console.log(cookies.cookies.jwt);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                /* Incorrect  */
                if (data.msg.includes('username') || data.msg.includes('Sorry'))
                    this.setState({ user_message: data.msg });
                else if (data.msg.includes('password')) this.setState({ pass_message: data.msg });
                else {
                    console.log(data);
                    // setting the token as cookie called role
                    if (data.msg === 'Fan') cookies.set('role', 1, { path: '/' });
                    else if (data.msg === 'Manager') cookies.set('role', 2, { path: '/' });
                    else if (data.msg === 'SA') cookies.set('role', 3, { path: '/' });

                    // Redirect the user to the home page
                    this.props.history.push('/');
                }
            });
    }

    render() {
        // console.log(document.cookie);
        // console.log(JSON.stringify(this.state))
        return (
            <FormComponent
                changeHandler={this.changeHandler}
                submitHandler={this.submitHandler}
                user_message={this.state.user_message}
                pass_message={this.state.pass_message}
            />
        );
    }
}

// Higher order component
export default compose(withRouter, withCookies)(Form);
