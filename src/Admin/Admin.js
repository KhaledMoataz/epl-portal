import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import UsersList from './UsersList';
import WaitingList from './WaitingList';
import { BASE_URL, getRequestOptions } from '../common/constants';

const Admin = () => {
    const [users, setUsers] = useState(null);
    const [managers, setManagers] = useState(null);
    const [cookies] = useCookies(['jwt', 'role']);
    const [refreshKey, setRefreshKey] = useState(0); // using it refresh the content

    const token = cookies.jwt;
    const requestOptions = getRequestOptions(token);

    useEffect(() => {
        fetch(`${BASE_URL}/allUsers`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.registered);
                setUsers(data.registered);
                setManagers(data.pending);
            })
            .catch(() => {
                setUsers([]);
                setManagers([]);
            });
    }, [refreshKey]);

    const handleAcception = (Username) => {
        fetch(`${BASE_URL}/authenticate`, {
            method: 'PUT',
            headers: {
                jwt: token,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ username: Username })
        })
            .then((response) => response.json())
            .then((data) => {
                // Deleting the user
                if (data.msg.includes('authenticate')) {
                    const newManagers = managers.filter((manager) => manager.username !== Username);
                    setManagers(newManagers);
                    setRefreshKey((oldKey) => oldKey + 1);
                }
            });
    };

    const handleDelete = (Username, OldUser) => {
        fetch(`${BASE_URL}/delete`, {
            method: 'DELETE',
            headers: {
                jwt: token,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ username: Username })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.msg.includes('delete')) {
                    if (OldUser) {
                        const newUsers = users.filter((user) => user.username !== Username);
                        setUsers(newUsers);
                    } else {
                        const newManagers = managers.filter(
                            (manager) => manager.username !== Username
                        );
                        setManagers(newManagers);
                    }
                    setRefreshKey((oldKey) => oldKey + 1);
                }
            });
    };

    return (
        <div className="container-fluid py-5 px-5">
            <div className="row">
                <h1 className="text-center col-6">Pending</h1>

                <h1 className="text-center col-6">ALL Users</h1>
            </div>

            <div className="row">
                <div className="col-6 border border-primary">
                    <WaitingList
                        Deletion={handleDelete}
                        Acceptoion={handleAcception}
                        waitingList={managers}
                    />
                </div>

                <div className="col-6 border border-primary">
                    <UsersList DeleteUser={handleDelete} users={users} />
                </div>
            </div>
        </div>
    );
};

export default Admin;
