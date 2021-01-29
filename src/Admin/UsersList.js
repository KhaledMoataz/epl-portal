import React from 'react';
import Item from './Item';

function UsersList({ users }) {
    const handleDelete = () => {
        console.log('Delete');
    };

    if (users === null) return null;

    const allUsers = users.map((user) => (
        <Item Delete={handleDelete} username={user.username} columnNum="2" />
    ));
    return allUsers;
}

export default UsersList;
