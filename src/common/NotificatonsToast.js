import React, { useContext } from 'react';
import { Toast } from 'react-bootstrap';
import { Context } from '../Store';

const NotificatonsToast = () => {
    const [globalState, dispatch] = useContext(Context);

    const handleClose = () => dispatch({ type: 'NOTIFICATION', payload: { title: '', body: '' } });

    return (
        <Toast
            style={{
                position: 'absolute',
                top: '10%',
                right: '0%',
                width: '100%',
                zIndex: 9999
            }}
            show={globalState.notification.title.length}
            onClose={handleClose}
            delay={3000}
            autohide>
            <Toast.Header>
                <strong className="mr-auto">{globalState.notification.title}</strong>
            </Toast.Header>
            <Toast.Body>{globalState.notification.body}</Toast.Body>
        </Toast>
    );
};

export default NotificatonsToast;
