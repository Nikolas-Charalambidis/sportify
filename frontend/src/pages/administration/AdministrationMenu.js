import React from 'react';
import {Heading} from '../../basicComponents';
import {AdministrationMenuCard} from '../../organisms/administration/AdministrationMenuCard';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AdministrationMenuBreadcrumbs} from "../../organisms/breadcrumbs/AdministrationMenuBreadcrumbs";

export function AdministrationMenu() {
    return (
        <div>
            <AdministrationMenuBreadcrumbs />
            <Heading className="pageHeading mt-4 mb-5 dont-break-out">Administrace</Heading>

            <Row className="mb-4">
                <Col lg={6} md={6}>
                    <AdministrationMenuCard title="Správa profilu" text="Správa profilu zahrnuje editaci Vašeho profilu, zobrazení týmu, ve za které hrajete a seznam všech soutěží." click="profile"/>
                </Col>
                <Col lg={6} md={6} className="mt-4 mt-md-0">
                    <AdministrationMenuCard title="Správa týmů" text="Správa, případné založení vlastního týmu umožňuje editovat údaje a zobrazovat soupisku hráčů." click="teams"/>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col lg={6} md={6}>
                    <AdministrationMenuCard title="Nový odehraný zápas" text="Slouží pro vytvoření klasického zápasu, který se již odehral. Umožňuje přepsat výsledky a statistiky utkání." click="matches/createForm"/>
                </Col>
                <Col lg={6} md={6} className="mt-4 mt-md-0">
                    <AdministrationMenuCard title="Nový interaktivní zápas" text="Slouží pro vytvoření interaktivního zápasu, který je možné real time upravovat při daném utkání." click="matches/createInteractive"/>
                </Col>
            </Row>
        </div>
    );
}