import React, {useEffect, useState} from 'react';
import {Alert} from "react-bootstrap";
import {withRouter} from "react-router";
import Event from '../utils/event';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"

const iconsEnum = {
    'warning': Icons.faExclamationTriangle,
    'success': Icons.faCheckCircle,
    'danger': Icons.faExclamationCircle
};

function FlashBase() {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');
    let [link, setLink] = useState('');

    useEffect(() => {
        const onFlash = ({message, type, timeout, link}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setLink(link);
            setTimeout(() => {
                setVisibility(false);
            }, timeout);
        };
        Event.addListener('flash', onFlash);

        return () => {
            Event.removeEventListener('flash', onFlash)
        }
    }, []);

    return (
        <Alert variant={type} show={visibility} onClose={() => setVisibility(false)} dismissible>
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
    );
}

export const Flash = withRouter(FlashBase);
