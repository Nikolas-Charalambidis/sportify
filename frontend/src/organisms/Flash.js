import React, {useEffect, useRef, useState} from 'react';
import {Alert, Overlay} from "react-bootstrap";
import {withRouter} from "react-router";
import Event from '../utils/event';

function FlashBase() {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');
    let [link, setLink] = useState('');
    const target = useRef(null);

    useEffect(() => {
        Event.addListener('flash', ({message, type, timeout, link}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setLink(link);
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
                    {link && <Alert.Link href={link}>ODKAZ</Alert.Link>}
                </Alert>
            </Overlay>
        </div>
    );
}

export const Flash = withRouter(FlashBase);


