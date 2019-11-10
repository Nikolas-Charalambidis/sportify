import React, {useEffect, useRef, useState} from 'react';
import {Alert, Overlay} from "react-bootstrap";
import {withRouter} from "react-router";
import Event from '../utils/event';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"

const iconsEnum = {
    'warning': Icons.faExclamationTriangle,
    'success': Icons.faCheckCircle,
    'danger': Icons.faExclamationCircle,
};

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
            <Overlay target={target.current} show={visibility} placement="bottom">
                <Alert className="flash" variant={type} onClose={() => setVisibility(false)} dismissible>
                    <div className="alert-labeled-row">
                        <span className={'alert-label alert-label-left alert-labelled-cell alert-label-' + type}>
                            <FontAwesomeIcon icon={iconsEnum[type]} size="1x"/>
                        </span>
                        <p className="text-center alert-body alert-body-right alert-labelled-cell">
                            {message}
                            {link && <Alert.Link href={link}>ODKAZ</Alert.Link>}
                        </p>
                    </div>
                </Alert>
            </Overlay>
        </div>
    );
}

export const Flash = withRouter(FlashBase);


