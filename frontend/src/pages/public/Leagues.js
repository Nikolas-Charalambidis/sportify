import React from 'react';

import {Heading} from '../../atoms';
import {Breadcrumb} from 'react-bootstrap';

export function Leagues() {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Soutěže</Breadcrumb.Item>
            </Breadcrumb>
            <Heading>Soutěže</Heading>
            <p>This page is empty for now...</p>
        </div>
    );
}
