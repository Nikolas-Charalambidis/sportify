import React from 'react';
import {Heading} from '../../atoms';
import {Breadcrumb} from 'react-bootstrap';
import {NavLink as Link} from "react-router-dom";
import {AdministrationMenuCard} from '../../organisms/administration/AdministrationMenuCard';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function AdministrationMenu() {
    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><span className="active">Administrace</span></li>
            </Breadcrumb>
            <Heading className="pageHeading mt-4 mb-5 dont-break-out">Administrace</Heading>

            <Row>
                <Col lg={6} md={6}>
                    <AdministrationMenuCard title="Správa profilu" text="Správa profilu zahrnuje editaci Vašeho profilu, zobrazení týmu, ve za které hrajete a seznam všech soutěží." click="profile"/>
                </Col>
                <Col lg={6} md={6} className="mt-4 mt-md-0">
                    <AdministrationMenuCard title="Správa týmů" text="Správa, případné založení vlastního týmu umožňuje editovat údaje a zobrazovat soupisku hráčů." click="teams"/>
                </Col>
            </Row>
        </div>
    );
}