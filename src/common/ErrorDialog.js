import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Context } from '../Store';

export default function ErrorDialog() {
    const [globalState, dispatch] = useContext(Context);

    const handleClose = () => dispatch({ type: 'ERROR', payload: null });

    return (
        <Dialog
            open={globalState.error != null}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth>
            <DialogTitle id="alert-dialog-title">Error</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {globalState.error}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
