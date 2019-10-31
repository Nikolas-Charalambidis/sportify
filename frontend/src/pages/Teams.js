import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';
import {Breadcrumb} from "react-bootstrap";
import {Footer} from "../organisms/Footer";

export function Teams() {
    return (
        <div>
            <TopNavigation/>
            <MainSection>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                    <Breadcrumb.Item active>Týmy</Breadcrumb.Item>
                </Breadcrumb>
                <Heading>Týmy</Heading>
                <p>This page is empty for now...</p>
            </MainSection>
            <Footer/>
        </div>
    );
}
