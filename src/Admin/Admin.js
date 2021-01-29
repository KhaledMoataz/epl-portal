import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import UsersList from './UsersList';
import WaitingList from './WaitingList';
import { BASE_URL, getRequestOptions } from '../common/constants';

const Admin = () => {
    const [users, setUsers] = useState(null);
    const [managers, setManagers] = useState(null);
    const [cookies] = useCookies(['jwt', 'role']);

    const token = cookies.jwt;
    const requestOptions = getRequestOptions(token);

    useEffect(() => {
        fetch(`${BASE_URL}/admin/users`, requestOptions)
            .then((response) => response.json())
            .then((response) => response.users.map((user) => ({ username: user.username })))
            .then((data) => setUsers(data));
        setUsers([{ username: 'aymanazzam' }, { username: 'aymanazzam2' }]);

        fetch(`${BASE_URL}/admin/managers`, requestOptions)
            .then((response) => response.json())
            .then((response) =>
                response.managers.map((manager) => ({
                    username: manager.username
                }))
            )
            .then((data) => setUsers(data));
        setManagers([{ username: 'aymanazzam manager' }, { username: 'aymanazzam2 manager' }]);
    }, []);

    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-6 border border-primary">
                    <WaitingList waitingList={managers} />
                </div>

                <div className="col-6 border border-primary">
                    <UsersList users={users} />
                </div>
            </div>
        </div>
    );
};

export default Admin;
