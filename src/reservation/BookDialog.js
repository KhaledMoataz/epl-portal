import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCookies } from 'react-cookie';
import { Context } from '../Store';
import { BASE_URL, buildRequestOptions } from '../common/constants';

const BookDialog = (props) => {
    const [creditNo, setCard] = useState('');
    const [pin, setPin] = useState('');
    const [cookies] = useCookies(['jwt', 'role']);
    const [, dispatch] = useContext(Context);
    const token = cookies.jwt;
    const { matchId, seatId } = props;

    const handleCardChange = (event) => {
        setCard(event.target.value);
    };

    const handlePinChange = (event) => {
        setPin(event.target.value);
    };

    const handleBook = () => {
        const requestOptions = buildRequestOptions('POST', token, {
            matchId,
            seatId,
            creditNo,
            pin
        });

        fetch(`${BASE_URL}/matches/reservation`, requestOptions)
            .then((response) => {
                if (response.status === 401) throw Error('Please login first.');
                else if (response.status === 400) throw Error('This seat is already booked.');
                else return response.json();
            })
            .then((data) => {
                const notification = {
                    title: 'Sucessfully Booked.',
                    body: `Ticket ID: ${data.ticketId}`
                };
                dispatch({ type: 'NOTIFICATION', payload: notification });
                props.handleClose();
            })
            .catch((e) => {
                const notification = {
                    title: 'Error!',
                    body: e.message
                };
                dispatch({ type: 'NOTIFICATION', payload: notification });
                props.handleClose();
            });
    };

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Book Seat</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To book this seat, please enter your credit card and pin number.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="credit-card"
                    label="Credit Card"
                    value={creditNo}
                    onChange={handleCardChange}
                    type="text"
                    required
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="pin"
                    label="Pin Number"
                    value={pin}
                    onChange={handlePinChange}
                    type="password"
                    required
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleBook}
                    color="primary"
                    disabled={!creditNo.length || !pin.length}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookDialog;
