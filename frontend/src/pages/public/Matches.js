import React from 'react';

import {Heading} from '../../basicComponents';
import {Breadcrumb} from "react-bootstrap";

export function Matches() {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Zápasy</Breadcrumb.Item>
            </Breadcrumb>
            <Heading>Zápasy</Heading>
            <p>This page is empty for now...</p>
        </div>
    );
}
