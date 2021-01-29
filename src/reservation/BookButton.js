import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import BookDialog from './BookDialog';
import './reservation.css';

const BookButton = (props) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleClick = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        props.refresh();
    };

    const { matchId, seatId } = props;

    return (
        <>
            <BookDialog
                seatId={seatId}
                matchId={matchId}
                open={showDialog}
                handleClose={handleCloseDialog}
                notify={props.notify}
            />
            <Button className="reservation-button" variant="outline-primary" onClick={handleClick}>
                Book
            </Button>
        </>
    );
};

export default BookButton;
