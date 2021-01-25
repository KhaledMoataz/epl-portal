import React from 'react';
import FormComponent from './FormComponent';

/*  This file contains the form logic
    The form have 2 states to control the inputs and send thin to the server
        and 1 state to store the response from the the server
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

        /* to don't send request again if the user didn't update the input after the error */
        if (this.state.user_message || this.state.pass_message) return;
        // console.log(JSON.stringify(this.state));

        fetch('https://6eceeb74cf86.ngrok.io/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => response.json())
            .then((data) => {
                /* Incorrect  */
                if (data.msg === 'incorrect username') {
                    this.setState({ user_message: data.msg });
                } else if (data.msg === 'incorrect password') {
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
                user_message={this.state.user_message}
                pass_message={this.state.pass_message}
            />
        );
    }
}

export default Form;