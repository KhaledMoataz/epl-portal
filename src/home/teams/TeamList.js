import React from 'react';
import TeamItem from './TeamItem';

function TeamList(props) {
    const teamsList = props.teams.map((team) => <TeamItem key={team.id} team={team} />);
    return (
        <div className="team-list">
            <div className="list-heading">Teams</div>
            {teamsList}
        </div>
    );
}

export default TeamList;
