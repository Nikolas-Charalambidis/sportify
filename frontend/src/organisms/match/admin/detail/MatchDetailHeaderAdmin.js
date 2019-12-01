import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function MatchDetailHeaderAdmin({hostName, guestName}) {
    return (
        <Row className="match-score">
            <Col lg={1} md={0} sm={0} xs={0} />
            <Col lg={4} md={12} sm={12} xs={12} className="align-self-center team-home">
                <div className="text-center mt-2">Domácí:</div>
                <h2>{hostName}</h2>
            </Col>
            <Col lg={2} md={0} sm={0} xs={0} />
            <Col lg={4} md={12} sm={12} xs={12} className="align-self-center team-visiting">
                <div className="text-center mt-2">Hosté:</div>
                <h2>{guestName}</h2>
            </Col>
            <Col lg={1} md={0} sm={0} xs={0} />
        </Row>
    );
}
