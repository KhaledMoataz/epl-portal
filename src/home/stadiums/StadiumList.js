import React from 'react';
import StadiumItem from './StadiumItem';

function StadiumList(props) {
    const StadiumsList = props.stadiums.map((stadium) => (
        <StadiumItem key={stadium.id} stadium={stadium} />
    ));
    return (
        <div className="team-list">
            <div className="list-heading">Stadiums</div>
            {StadiumsList}
        </div>
    );
}

export default StadiumList;
