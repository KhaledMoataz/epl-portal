import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import PassFormComponent from './PassFormComponent';

const endpoint = 'https://f31cbb2ba792.ngrok.io/change-password/';

/*  This file contains the form logic
    The form have 10 states to control the inputs and send thim to the server
        and 2 states to store the response from the the server
    We have 2 functions: 
        1- changeHandler:   to change the state when the input change
        2- submitHandler:   to submit the form inputs to the server
*/

class PassForm extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor() {
        super();

        this.state = {
            old_password: '',
            new_password: '',
            confirm_new_password: '',

            old_pass_message: null,
            new_pass_message: null
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
        if (name === 'old_password') this.setState({ old_pass_message: null });
        else if (name === 'new_password' || name === 'confirm_new_password')
            this.setState({ new_pass_message: null });

        this.setState({ [name]: value });
    }

    submitHandler(event) {
        event.preventDefault();

        const { cookies } = this.props;

        /* to don't send request again if the user didn't update the input after the error */
        if (this.state.old_pass_message || this.state.new_pass_message) return;
        // console.log(JSON.stringify(this.state));

        fetch(endpoint, {
            method: 'PUT',
            headers: {
                jwt: cookies.cookies.jwt,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(this.state)
        })
            .then((response) => response.json())
            .then((data) => {
                /*  Store the server response in variables */
                let oldPassMessage = data.old_password;
                let newPassMessage = data.new_password;

                if (data.msg === 'error') {
                    /*  The Message that empty it means it's not thre reason for the erron so
                        we make it equals null to not be presented as error message to the user 
                    */
                    if (oldPassMessage.length === 0) oldPassMessage = null;
                    if (newPassMessage.length === 0) newPassMessage = null;

                    this.setState({
                        old_pass_message: oldPassMessage,
                        new_pass_message: newPassMessage
                    });
                } else {
                    // Redirection should done here
                }
            });
    }

    render() {
        // console.log(JSON.stringify(this.state))
        return (
            <PassFormComponent
                changeHandler={this.changeHandler}
                submitHandler={this.submitHandler}
                old_pass_message={this.state.old_pass_message}
                new_pass_message={this.state.new_pass_message}
            />
        );
    }
}

export default withCookies(PassForm);
