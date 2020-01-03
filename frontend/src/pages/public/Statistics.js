import React from 'react';

import {Heading} from '../../basicComponents';
import {Breadcrumb} from "react-bootstrap";

export function Statistics() {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Statistiky</Breadcrumb.Item>
            </Breadcrumb>
            <Heading>Statistiky</Heading>
            <p>This page is empty for now...</p>
        </div>
    );
}
