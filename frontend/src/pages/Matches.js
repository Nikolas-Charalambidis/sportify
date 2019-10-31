import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';
import {Breadcrumb} from "react-bootstrap";
import {Footer} from "../organisms/Footer";

export function Matches() {
    return (
        <div>
            <TopNavigation/>
            <MainSection>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                    <Breadcrumb.Item active>Zápasy</Breadcrumb.Item>
                </Breadcrumb>
                <Heading>Zápasy</Heading>
                <p>This page is empty for now...</p>
            </MainSection>
            <Footer/>
        </div>
    );
}
