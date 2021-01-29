import React from 'react';
import { Toast } from 'react-bootstrap';

const NotificatonsToast = (props) => (
    <Toast
        style={{
            position: 'absolute',
            top: '10%',
            right: '0%',
            width: '100%',
            zIndex: 9999
        }}
        show={props.show}
        onClose={props.onClose}
        delay={3000}
        autohide>
        <Toast.Header>
            <strong className="mr-auto">{props.title}</strong>
        </Toast.Header>
        <Toast.Body>{props.body}</Toast.Body>
    </Toast>
);

export default NotificatonsToast;
