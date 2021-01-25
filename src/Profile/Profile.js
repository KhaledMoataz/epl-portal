import React from 'react';
import DataForm from './DataFormContainer';
import PassForm from './PassFormContainer';
import '../common/styles.css';

/*  Profile is a Card, and its body consists of three components
        1- profileHeader        --> It presents The user photo, username and password
        2- Form                 --> It contains the user informations
*/

class Profile extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <div className="container-fluid bg-info">
                <div className="row resize-page justify-content-md-center">
                    <div className="card col-md-8">
                        <div className="card-body bg-light">
                            <DataForm />
                            <br />
                            <br />
                            <PassForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
