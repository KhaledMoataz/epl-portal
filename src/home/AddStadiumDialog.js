import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { LinearProgress } from '@material-ui/core';
import { Context } from '../Store';
import { buildRequestOptions } from '../common/constants';

export default function AddStadiumDialog({ isShown, handleClose, addStadium, token }) {
    const initialState = {
        name: '',
        rows: 3,
        cols: 8
    };
    const [stadium, setStadium] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ name: '', rows: '', cols: '' });
    const [, dispatch] = useContext(Context);

    const handleNameChange = (event) => {
        const { value } = event.target;
        setStadium({ ...stadium, name: value });
        if (error.name !== '') setError({ ...error, name: '' });
    };

    const handleRowsChange = (event) => {
        const { value } = event.target;
        setStadium({ ...stadium, rows: value });
        if (value < 3) setError({ ...error, rows: 'It should be 3 or more' });
        else if (error.rows !== '') setError({ ...error, rows: '' });
    };

    const handleColsChange = (event) => {
        const { value } = event.target;
        setStadium({ ...stadium, cols: value });
        if (value < 8) setError({ ...error, cols: 'It should be 8 or more' });
        else if (error.cols !== '') setError({ ...error, cols: '' });
    };

    useEffect(() => {
        if (!isShown) {
            setStadium(initialState);
            setLoading(false);
            setError({ name: '', rows: '', cols: '' });
        }
    }, [isShown]);

    const postStadium = (newStadium) => {
        const stadiumObj = {
            name: newStadium.name,
            numRows: newStadium.rows,
            seats_per_row: newStadium.cols
        };
        const requestOptions = buildRequestOptions('POST', token, stadiumObj);
        setLoading(true);
        fetch('https://f31cbb2ba792.ngrok.io/stadia/add', requestOptions)
            .then((response) => {
                if (response.ok) {
                    setLoading(false);
                    addStadium(newStadium);
                    throw Error('ok');
                }
                return response.json();
            })
            .then((errorResponse) => {
                setLoading(false);
                setError({
                    name: errorResponse.name,
                    rows: errorResponse.numRows,
                    cols: errorResponse.seats
                });
            })
            .catch((errorThrown) => {
                if (errorThrown.message === 'ok') return;
                setLoading(false);
                dispatch({ type: 'ERROR', payload: errorThrown.message });
            });
    };

    return (
        <div>
            <Dialog open={isShown} onClose={handleClose} aria-labelledby="form-dialog-title">
                {loading ? <LinearProgress /> : null}
                <DialogTitle id="form-dialog-title">Add Stadium</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Stadium Name"
                        type="text"
                        value={stadium.name}
                        onChange={handleNameChange}
                        fullWidth
                        error={error.name.length !== 0}
                        helperText={error.name}
                    />
                    <TextField
                        className="mr-2"
                        margin="dense"
                        name="rows"
                        min="3"
                        label="Rows"
                        type="number"
                        value={stadium.rows}
                        onChange={handleRowsChange}
                        error={error.rows.length !== 0}
                        helperText={error.rows}
                    />
                    <TextField
                        margin="dense"
                        name="cols"
                        label="Seats per row"
                        type="number"
                        value={stadium.cols}
                        onChange={handleColsChange}
                        error={error.cols.length !== 0}
                        helperText={error.cols}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        disabled={
                            loading ||
                            stadium.name === '' ||
                            error.rows.length + error.cols.length + error.name.length !== 0
                        }
                        onClick={() => postStadium(stadium)}
                        color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
