import React from 'react';

import {Heading} from '../../atoms';
import {Breadcrumb} from "react-bootstrap";

export function Contact() {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Kontakt</Breadcrumb.Item>
            </Breadcrumb>
            <Heading>Kontakt</Heading>
            <p>This page is empty for now...</p>
        </div>
    );
}
