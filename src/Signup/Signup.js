import React from 'react';
import Form from './FormContainer';
import './styles.css';

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
                <h1 className="bg-light">OR</h1>
            </div>
        </div>
    );

    return (
        <div className="card bg-info">
            <div className="card-body bg-light border mx-auto my-5" style={{ minWidth: 600 }}>
                {myHeader}
                {mySocial}
                <Form />
            </div>
        </div>
    );
}

export default Signup;
