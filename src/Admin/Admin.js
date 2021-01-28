import React from 'react';
import Item from './Item';

const Admin = () => {
    const handleDelete = () => {
        console.log('Delete');
    };

    const handleAccept = () => {
        console.log('Accept');
    };

    const handleCancel = () => {
        console.log('Cancel');
    };

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-6">
                    <Item
                        Cancel={handleCancel}
                        Accept={handleAccept}
                        username="aymanazzam"
                        columnNum="1"
                    />
                </div>

                <div className="col-6">
                    <Item Delete={handleDelete} username="aymanazzam2" columnNum="2" />
                </div>
            </div>
        </div>
    );
};

export default Admin;
