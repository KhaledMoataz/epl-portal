import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCookies } from 'react-cookie';
import { BASE_URL, buildRequestOptions } from '../common/constants';

const BookDialog = (props) => {
    const [cookies] = useCookies(['jwt', 'role']);
    const token = cookies.jwt;
    const { matchId, seatId } = props;

    const handleUnbook = () => {
        const requestOptions = buildRequestOptions('DELETE', token, {
            matchId,
            seatId
        });

        fetch(`${BASE_URL}/matches/reservation`, requestOptions)
            .then((response) => response.json())
            .then(() => {
                props.notify({
                    title: 'Sucessfully Cancelled.',
                    body: `Seat ${seatId + 1}`
                });
                props.handleClose();
            })
            .catch((e) => {
                props.notify({
                    title: 'Error!',
                    body: e.message
                });
                props.handleClose();
            });
    };

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Book Seat</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to cancel your reservation?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUnbook} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookDialog;
