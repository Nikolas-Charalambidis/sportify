import React from 'react';

import {Heading} from '../atoms/';
import {Breadcrumb} from "react-bootstrap";
import {MatchMenuCard} from "./match/create-form/components/MatchMenuCard";

export function Matches() {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Zápasy</Breadcrumb.Item>
            </Breadcrumb>
            <Heading>Zápasy</Heading>
            <MatchMenuCard title="Vytvořit zápas" text="Formulář pro vytvoření zápasu" click="match-create-form"/>
        </div>
    );
}
