/* eslint-disable no-unused-vars */
import React from 'react';
import queryString from 'query-string';
import ReservationTable from './ReservationTable';
import MatchDetails from './MatchDetails';

const ReservationPage = (props) => {
    const url = props.location.search;
    const { matchId } = queryString.parse(url);

    return (
        <>
            {/* <h1>Reservation</h1> */}
            <MatchDetails matchId={matchId} />
            <ReservationTable matchId={matchId} />
        </>
    );
};

export default ReservationPage;
