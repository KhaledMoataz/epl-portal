import React from 'react';
import MatchDetailsCard from './MatchDetailsCard';

function MatchDetailsList({ matches, stadiums, teams, userType, token }) {
    if (matches === null) return null;
    const matchDetailsCards = matches.map((match) => (
        <MatchDetailsCard
            key={match.id}
            match={match}
            stadiums={stadiums}
            teams={teams}
            userType={userType}
            token={token}
        />
    ));
    return <div>{matchDetailsCards}</div>;
}

export default MatchDetailsList;
