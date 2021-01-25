import React from 'react';
import FormComponent from './DataFormComponent';

/*  This file contains the form logic
    The form have 10 states to control the inputs and send thim to the server
        and 2 states to store the response from the the server
    We have 2 functions: 
        1- changeHandler:   to change the state when the input change
        2- submitHandler:   to submit the form inputs to the server
*/

class DataForm extends React.Component {
    constructor() {
        super();

        this.state = {
            first_name: '',
            last_name: '',
            birthdate: '2021-1-1',
            gender: 'Male',
            city: '',
            address: '',
            email: '',
            role: 'Fan',
            old_password: '',
            confirm_old_password: '',

            pass_message: null,
            role_message: null
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
        if (name === 'password') this.setState({ pass_message: null });
        else if (name === 'role') this.setState({ role_message: null });

        this.setState({ [name]: value });
    }

    submitHandler(event) {
        event.preventDefault();

        /* to don't send request again if the user didn't update the input after the error */
        if (this.state.pass_message || this.state.role_message) return;
        // console.log(JSON.stringify(this.state));

        fetch('https://6eceeb74cf86.ngrok.io/profile/', {
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
                let newPassMessage = data.password;
                let newEmailMessage = data.email;

                if (data.msg === 'error') {
                    /*  The Message that empty it means it's not thre reason for the erron so
                        we make it equals null to not be presented as error message to the user 
                    */
                    if (newPassMessage.length === 0) newPassMessage = null;
                    if (newEmailMessage.length === 0) newEmailMessage = null;

                    this.setState({
                        pass_message: newPassMessage,
                        role_message: newEmailMessage
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
                pass_message={this.state.pass_message}
                role_message={this.state.role_message}
            />
        );
    }
}

export default DataForm;
