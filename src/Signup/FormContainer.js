import React from 'react';
import FormComponent from './FormComponent';

/*  This file contains the form logic
    The form have 10 states to control the inputs and send thim to the server
        and 4 states to store the response from the the server
    We have 2 functions: 
        1- changeHandler:   to change the state when the input change
        2- submitHandler:   to submit the form inputs to the server
*/

class Form extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            birthdate: '2021-1-1',
            gender: 'Male',
            city: '',
            address: '',
            email: '',
            role: 'Fan',

            user_message: null,
            pass_message: null,
            email_message: null
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
        else if (name === 'email') this.setState({ email_message: null });

        this.setState({ [name]: value });
    }

    submitHandler(event) {
        event.preventDefault();

        /* to don't send request again if the user didn't update the input after the error */
        if (this.state.user_message || this.state.pass_message || this.state.email_message) return;
        // console.log(JSON.stringify(this.state));

        /* this.setState({
            user_message: 'please Enter a unique username',
            pass_message: null,
            email_message: null
        }); */

        fetch('https://6eceeb74cf86.ngrok.io/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => response.json())
            .then((data) => {
                /*  Store the server response in variables */
                let newUserMessage = data.username;
                let newPassMessage = data.password;
                let newEmailMessage = data.email;

                if (data.msg === 'error') {
                    /*  The Message that empty it means it's not thre reason for the erron so
                        we make it equals null to not be presented as error message to the user 
                    */
                    if (newUserMessage.length === 0) newUserMessage = null;
                    if (newPassMessage.length === 0) newPassMessage = null;
                    if (newEmailMessage.length === 0) newEmailMessage = null;

                    this.setState({
                        user_message: newUserMessage,
                        pass_message: newPassMessage,
                        email_message: newEmailMessage
                    });
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
                user_message={this.state.user_message}
                pass_message={this.state.pass_message}
                email_message={this.state.email_message}
            />
        );
    }
}

export default Form;
