import React from 'react';
import MatchDetailsCard from './MatchDetailsCard';

function MatchDetailsList(props) {
    if (props.matches === null) return null;
    const matchDetailsCards = props.matches.map((match) => (
        <MatchDetailsCard
            key={match.id}
            match={match}
            stadiums={props.stadiums}
            teams={props.teams}
        />
    ));
    return <div>{matchDetailsCards}</div>;
}

export default MatchDetailsList;
