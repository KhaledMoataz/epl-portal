import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@material-ui/core';
import { BASE_URL, getUserType, getRequestOptions, FAN } from '../common/constants';
import BookButton from './BookButton';
import UnbookButton from './UnbookButton';
import { Context } from '../Store';
import './reservation.css';

const BookedButton = () => (
    <Button className="reservation-button" variant="dark" disabled>
        Booked
    </Button>
);

const ReservationTable = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [seats, setSeats] = useState([[]]);
    const [, dispatch] = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cookies] = useCookies(['jwt', 'role']);

    const userType = getUserType(cookies.role);
    const token = cookies.jwt;
    const { matchId } = props;
    const requestOptions = getRequestOptions(token);

    const fetchSeats = () => {
        setLoading(true);
        fetch(`${BASE_URL}/matches/grid?matchId=${matchId}`, requestOptions)
            .then((response) => {
                if (response.status === 401) throw Error('Please login first.');
                return response.json();
            })
            .then((data) => {
                setSeats(data.grid);
                setLoading(false);
            })
            .catch((e) => {
                setError(true);
                const notification = {
                    title: 'Error',
                    body: e.message
                };
                dispatch({ type: 'NOTIFICATION', payload: notification });
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchSeats();
    }, []);

    return (
        !error && (
            <div className="reservation-bg">
                <div className="reservation-window">
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        seats.map((row, rowIndex) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div className="reservation-row" key={rowIndex}>
                                {row.map((chair, colIndex) => {
                                    const auxKey = rowIndex * row.length + colIndex;
                                    switch (chair) {
                                        case -1:
                                            return <BookedButton key={auxKey} />;
                                        case 0:
                                            return (
                                                <BookButton
                                                    key={auxKey}
                                                    seatId={auxKey}
                                                    matchId={matchId}
                                                    disabled={userType !== FAN}
                                                    notify={props.notify}
                                                    refresh={fetchSeats}
                                                />
                                            );
                                        case 1:
                                            return (
                                                <UnbookButton
                                                    key={auxKey}
                                                    seatId={auxKey}
                                                    matchId={matchId}
                                                    disabled={userType !== FAN}
                                                    notify={props.notify}
                                                    refresh={fetchSeats}
                                                />
                                            );
                                        default:
                                            return <></>;
                                    }
                                })}
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    );
};

export default ReservationTable;
