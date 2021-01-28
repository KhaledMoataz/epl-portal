import React from 'react';
import queryString from 'query-string';
import ReservationTable from './ReservationTable';

const ReservationPage = (props) => {
    const url = props.location.search;
    const params = queryString.parse(url);
    return (
        <>
            <h1>Reservation</h1>
            <ReservationTable matchId={params.matchId} />
        </>
    );
};

export default ReservationPage;
