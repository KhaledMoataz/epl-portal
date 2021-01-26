import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddStadiumDialog({ isShown, handleClose, addStadium }) {
    const emptyState = {
        name: '',
        rows: '',
        cols: ''
    };
    const [stadium, setStadium] = useState(emptyState);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setStadium({
            ...stadium,
            [name]: value
        });
    };

    useEffect(() => {
        if (!isShown) {
            setStadium(emptyState);
        }
    }, [isShown]);
    return (
        <div>
            <Dialog open={isShown} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Stadium</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Stadium Name"
                        type="text"
                        value={stadium.name}
                        onChange={handleFormChange}
                        fullWidth
                    />
                    <TextField
                        className="mr-2"
                        margin="dense"
                        name="rows"
                        label="Rows"
                        type="number"
                        value={stadium.rows}
                        onChange={handleFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="cols"
                        label="Seats per row"
                        type="number"
                        value={stadium.cols}
                        onChange={handleFormChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => addStadium(stadium)} color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
