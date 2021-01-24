import React from 'react';
import FormComponent from './FormComponent';

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
            email_message: null,
            msg: ''
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(event) {
        const { name, value } = event.target;

        if (name === 'username') this.setState({ user_message: null });
        else if (name === 'password') this.setState({ pass_message: null });
        else if (name === 'email') this.setState({ email_message: null });

        this.setState({ [name]: value });
    }

    submitHandler(event) {
        event.preventDefault();

        // console.log(JSON.stringify(this.state))

        /* this.setState({
            user_message: 'please Enter a unique username',
            pass_message: null,
            email_message: null,
            msg: 'error'
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
                let newUserMessage = data.username;
                let newPassMessage = data.password;
                let newEmailMessage = data.email;

                if (data.msg === 'error') {
                    if (newUserMessage.length === 0) newUserMessage = null;
                    if (newPassMessage.length === 0) newPassMessage = null;
                    if (newEmailMessage.length === 0) newEmailMessage = null;

                    this.setState({
                        user_message: newUserMessage,
                        pass_message: newPassMessage,
                        email_message: newEmailMessage
                    });
                }
                this.setState({ msg: data.msg });
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
