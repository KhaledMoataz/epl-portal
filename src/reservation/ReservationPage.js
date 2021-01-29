import React, { useState } from 'react';
import queryString from 'query-string';
import ReservationTable from './ReservationTable';
import NotificatonsToast from '../common/NotificatonsToast';
// import MatchDetailsCard from '../common/MatchDetailsCard';

const ReservationPage = (props) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notification, setNotification] = useState({ title: '', body: '' });
    const url = props.location.search;
    const { matchId } = queryString.parse(url);

    const toggleShowNotification = () => setShowNotification(!showNotification);
    const notify = (newNotification) => {
        setNotification(newNotification);
        toggleShowNotification();
    };

    return (
        <>
            <NotificatonsToast
                title={notification.title}
                body={notification.body}
                show={showNotification}
                onClose={toggleShowNotification}
            />
            <h1>Reservation</h1>
            {/* <MatchDetailsCard key={matchId} /> */}
            <ReservationTable matchId={matchId} notify={notify} />
        </>
    );
};

export default ReservationPage;
