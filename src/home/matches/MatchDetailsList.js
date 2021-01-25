import React from 'react';
import MatchDetailsCard from './MatchDetailsCard';

function MatchDetailsList(props) {
    const matchDetailsCards = props.matches.map((match) => (
        <MatchDetailsCard key={match.key} match={match} />
    ));
    return <div>{matchDetailsCards}</div>;
}

export default MatchDetailsList;
