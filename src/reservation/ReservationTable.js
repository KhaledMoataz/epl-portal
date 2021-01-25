import React from 'react';
import { Button } from 'react-bootstrap';
import './reservation.css';

const BookButton = () => (
    <Button variant="outline-primary" size="xxl">
        Book
    </Button>
);
const UnbookButton = () => (
    <Button variant="outline-danger" size="xxl">
        Unbook
    </Button>
);
const BookedButton = () => (
    <Button variant="dark" size="xxl" disabled>
        Booked
    </Button>
);

const isBooked = [
    [-1, 0, 0, 0, 0, 1, 1, -1, -1],
    [0, 1, 0, 0, -1, -1, -1, 0, -1]
];

const ReservationTable = () => (
    <div className="text-center">
        {isBooked.map((row, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={rowIndex}>
                {row.map((chair, colIndex) => {
                    const auxKey = rowIndex * row.length + colIndex;
                    switch (chair) {
                        case -1:
                            return <BookedButton key={auxKey} />;
                        case 0:
                            return <BookButton key={auxKey} />;
                        case 1:
                            return <UnbookButton key={auxKey} />;
                        default:
                            return <BookButton key={auxKey} />;
                    }
                })}
            </div>
        ))}
    </div>
);

export default ReservationTable;
