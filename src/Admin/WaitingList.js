import React from 'react';
import Item from './Item';

function WaitingList({ waitingList, Deletion, Acceptoion }) {
    if (waitingList === null) return null;

    const waiting = waitingList.map((manager) => (
        <Item
            key={manager.username}
            username={manager.username}
            Delete={Deletion}
            Acception={Acceptoion}
            columnNum="1"
        />
    ));
    return waiting;
}

export default WaitingList;
