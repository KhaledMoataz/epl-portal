import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { BASE_URL, getUserType, buildRequestOptions, FAN } from '../common/constants';
import './reservation.css';

const BookButton = () => (
    <Button className="reservation-button" variant="outline-primary">
        Book
    </Button>
);
const UnbookButton = () => (
    <Button className="reservation-button" variant="outline-danger">
        Unbook
    </Button>
);
const BookedButton = () => (
    <Button className="reservation-button" variant="dark" disabled>
        Booked
    </Button>
);

// const isBooked = [
//     [-1, 0, 0, 0, 0, 1, 1, -1, -1],
//     [0, 1, 0, 0, -1, -1, -1, 0, -1]
// ];

const ReservationTable = (props) => {
    const [seats, setSeats] = useState([[]]);
    const [cookies] = useCookies(['jwt', 'role']);

    const userType = getUserType(cookies.role);
    const token = cookies.jwt;
    const { matchId } = props;

    const fetchSeats = () => {
        const requestOptions = buildRequestOptions('POST', token, { matchId });
        console.log(requestOptions);
        fetch(`${BASE_URL}/matches/grid}`, requestOptions).then((response) => {
            console.log('Response: ', response);
            return response.grid;
        });
    };

    useEffect(() => {
        setSeats(fetchSeats());
    }, []);

    return (
        <div className="reservation-bg">
            <div className="reservation-window">
                {seats.map((row, rowIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className="reservation-row" key={rowIndex}>
                        {row.map((chair, colIndex) => {
                            const auxKey = rowIndex * row.length + colIndex;
                            switch (chair) {
                                case -1:
                                    return (
                                        <BookedButton key={auxKey} disabled={userType !== FAN} />
                                    );
                                case 0:
                                    return <BookButton key={auxKey} disabled={userType !== FAN} />;
                                case 1:
                                    return (
                                        <UnbookButton key={auxKey} disabled={userType !== FAN} />
                                    );
                                default:
                                    return <BookButton key={auxKey} disabled={userType !== FAN} />;
                            }
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationTable;
