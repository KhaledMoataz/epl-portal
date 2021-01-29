import React from 'react';
import queryString from 'query-string';
import ReservationTable from './ReservationTable';
// import MatchDetailsCard from '../common/MatchDetailsCard';

const ReservationPage = (props) => {
    const url = props.location.search;
    const { matchId } = queryString.parse(url);

    return (
        <>
            <h1>Reservation</h1>
            {/* <MatchDetailsCard key={matchId} /> */}
            <ReservationTable matchId={matchId} />
        </>
    );
};

export default ReservationPage;
