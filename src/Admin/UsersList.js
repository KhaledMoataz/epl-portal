import React from 'react';
import Item from './Item';

function UsersList({ users, DeleteUser }) {
    if (users === null) return null;

    const allUsers = users.map((user) => (
        <Item
            key={user.username}
            username={user.username}
            role={user.role}
            Delete={DeleteUser}
            columnNum="2"
        />
    ));
    return allUsers;
}

export default UsersList;
