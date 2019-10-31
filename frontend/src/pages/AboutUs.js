import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';
import {Breadcrumb} from "react-bootstrap";
import {Footer} from "../organisms/Footer";

export function AboutUs() {
    return (
        <div>
            <TopNavigation/>
            <MainSection>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                    <Breadcrumb.Item active href="/aboutus">O nás</Breadcrumb.Item>
                </Breadcrumb>
                <Heading>O nás</Heading>
                <p>This page is empty for now...</p>
            </MainSection>
            <Footer/>
        </div>
    );
}
