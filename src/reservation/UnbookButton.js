import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import UnbookDialog from './UnbookDialog';
import './reservation.css';

const UnbookButton = (props) => {
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
            <UnbookDialog
                seatId={seatId}
                matchId={matchId}
                open={showDialog}
                handleClose={handleCloseDialog}
                notify={props.notify}
            />
            <Button className="reservation-button" variant="outline-danger" onClick={handleClick}>
                Unbook
            </Button>
        </>
    );
};

export default UnbookButton;
