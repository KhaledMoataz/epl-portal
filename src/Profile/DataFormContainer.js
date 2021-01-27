import React from 'react';
import { compose } from 'redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import FormComponent from './DataFormComponent';

const endpoint1 = 'https://f31cbb2ba792.ngrok.io/profile/';
const endpoint2 = 'https://f31cbb2ba792.ngrok.io/edit-profile/';

/*  This file contains the form logic
    The form have 9 states to control the inputs and send thim to the server
        and 1 states to store the response from the the server
    We have 2 functions: 
        1- changeHandler:   to change the state when the input change
        2- submitHandler:   to submit the form inputs to the server
*/

class DataForm extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor() {
        super();

        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            birthdate: '2021-1-1',
            gender: 'Male',
            city: '',
            address: '',
            email: '',
            role: 'Fan',
            password: '',

            pass_message: null
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    // TO Check the user Autherization
    componentDidMount() {
        const { cookies } = this.props;

        fetch(endpoint1, {
            method: 'GET',
            headers: {
                jwt: cookies.cookies.jwt,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then((response) =>
                response.json().then((jsonResponse) => ({ ok: response.ok, data: jsonResponse }))
            )
            .then(({ ok, data }) => {
                console.log(ok);
                console.log(data);
                if (ok) this.setState({ ...data, birthdate: data.birthdate.substr(0, 10) });
                else {
                    // Redirect the user to the login page
                    this.props.history.push('/login');
                }
            });
    }

    changeHandler(event) {
        const { name, value } = event.target;

        /*  This part to delete the error message when the user starts typing again.
            When the message state not null for specific item, the form item for this message
            presents it's content as error message below the item
        */
        if (name === 'password') this.setState({ pass_message: null });

        this.setState({ [name]: value });
    }

    submitHandler(event) {
        event.preventDefault();

        const { cookies } = this.props;

        /* to don't send request again if the user didn't update the input after the error */
        if (this.state.pass_message) return;
        // console.log(JSON.stringify(this.state));

        fetch(endpoint2, {
            method: 'PUT',
            headers: {
                jwt: cookies.cookies.jwt,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log(0);
                if (data.msg !== 'success') {
                    this.setState({ pass_message: data.msg });
                } else {
                    // Redirection should done here
                }
            });
    }

    render() {
        // console.log(JSON.stringify(this.state))
        return (
            <FormComponent
                changeHandler={this.changeHandler}
                submitHandler={this.submitHandler}
                states={this.state}
            />
        );
    }
}

export default compose(withRouter, withCookies)(DataForm);
