import React, {useEffect, useRef, useState} from 'react';
import {Alert, Overlay} from "react-bootstrap";
import {withRouter} from "react-router";
import Event from '../utils/event';

function FlashBase() {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');
    const target = useRef(null);

    useEffect(() => {
        Event.addListener('flash', ({message, type, timeout}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, timeout);
        });
    });

    return (
        <div ref={target}>
            <Overlay target={target.current} show={visibility}  placement="bottom">
                <Alert className="flash" variant={type} onClose={() => setVisibility(false)} dismissible>
                    <p>{ message }</p>
                </Alert>
            </Overlay>
        </div>
    );
}

export const Flash = withRouter(FlashBase);


