import React from 'react';

function TeamItem(props) {
    return (
        <div>
            <div className="team-item">
                <img className="team-logo" src={props.team.logo} alt="team logo" />
                <div className="team-name">{props.team.name}</div>
            </div>
            <hr className="list-divider" />
        </div>
    );
}

export default TeamItem;
