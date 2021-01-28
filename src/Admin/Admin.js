import React from 'react';
import Item from './Item';

const Admin = () => (
    <div className="container-fluid py-3">
        <div className="row">
            <div className="col-6">
                <Item columnNum="1" />
            </div>

            <div className="col-6">
                <Item columnNum="2" />
            </div>
        </div>
    </div>
);

export default Admin;
