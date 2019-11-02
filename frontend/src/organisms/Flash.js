import React, { useEffect, useState } from 'react';
import {Alert, Container} from "react-bootstrap";
import {withRouter} from "react-router";
import Event from '../utils/event';

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
        <div>
        { visibility &&
            <Alert variant={type} onClose={() => setVisibility(false)} dismissible>
                <Container>
                    <p className="text-center">{message}</p>
                </Container>
            </Alert>
        }
        </div>
    );
}

export const Flash = withRouter(FlashBase);


