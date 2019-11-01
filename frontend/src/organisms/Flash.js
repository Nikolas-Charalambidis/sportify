import React, { useEffect, useState } from 'react';
import {Alert, Modal} from "react-bootstrap";
import {withRouter} from "react-router";
import EventEmitter from 'events';

function FlashBase() {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        new EventEmitter().addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            // setTimeout(() => {
            //     setVisibility(false);
            // }, 4000);
        });
    });

    return (
        <Modal show={visibility} onHide={() => setVisibility(false)}>
            <Modal.Body>
                <Alert variant={type} >
                    <p>{ message }</p>
                </Alert>
            </Modal.Body>
        </Modal>
    );
}

export const Flash = withRouter(FlashBase);


