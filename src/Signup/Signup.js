import React from 'react';
import Form from './FormContainer';
import './styles.css';

/*  Singup is a Card, and its body consists of three components
        1- myHeader(Card title) --> It presents "Create Account"
        2- mySocial             --> It presents "Google and Facebook Buttons"
        3- Form
*/

function Signup() {
    const myHeader = <h1 className="card-title text-center">Create Account</h1>;

    const mySocial = (
        <div>
            <a href="/" className="btn btn-block btn-google">
                <i className="fa fa-google-plus" />   Join with Google
            </a>
            <a href="/" className="btn btn-block btn-facebook">
                <i className="fa fa-facebook-f" />   Join with Facebook
            </a>
            <div className="divider-text">
                <span className="bg-light">OR</span>
            </div>
        </div>
    );

    return (
        <div className="card bg-info">
            <div className="card-body bg-light mx-auto my-5" style={{ minWidth: 600 }}>
                {myHeader}
                {mySocial}
                <Form />
            </div>
        </div>
    );
}

export default Signup;
