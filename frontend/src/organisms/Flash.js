import React, { useEffect, useState } from 'react';
import {Alert, Modal} from "react-bootstrap";
import {withRouter} from "react-router";
import Event from '../utils/event';
import '../assets/css/index.css';

function FlashBase() {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        Event.addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 5000);
        });
    });

    return (
        <div className="flash-message">
        { visibility &&
            <Alert variant={type} onClose={() => setVisibility(false)} dismissible>
                <p>{ message }</p>
            </Alert>
        }
        </div>
    );
}

export const Flash = withRouter(FlashBase);


