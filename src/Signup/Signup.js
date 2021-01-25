import React from 'react';
import Form from './FormContainer';
import '../common/styles.css';

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
        <div className="container-fluid bg-info">
            <div className="row resize-page justify-content-md-center">
                <div className="card col-md-6">
                    <div className="card-body bg-light">
                        {myHeader}
                        {mySocial}
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
