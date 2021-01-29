import React from 'react';
import Item from './Item';

function WaitingList({ waitingList }) {
    const handleAccept = () => {
        console.log('Accept');
    };

    const handleCancel = () => {
        console.log('Cancel');
    };

    if (waitingList === null) return null;

    const waiting = waitingList.map((manager) => (
        <Item
            Cancel={handleCancel}
            Accept={handleAccept}
            username={manager.username}
            columnNum="1"
        />
    ));
    return waiting;
}

export default WaitingList;
