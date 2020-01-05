import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export function MatchDetailScore({hostName, guestName, hostGoals, guestGoals}) {
    return (
        <Row className="match-score">
            <Col md={4} sm={12} xs={12} className=" align-self-center team-home">
                <div className="text-center mt-2">Domácí:</div>
                <h2>{hostName}</h2>
            </Col>
            <Col md={2} sm={12} xs={12} className="mb-lg-0 mb-md-0 mb-3 score align-self-center">
                <span className="home">{hostGoals === null ? 0 : hostGoals}</span>
            </Col>
            <Col md={2} sm={12} xs={12} className="align-self-center score">
                <span className="home">{guestGoals === null ? 0 : guestGoals}</span>
            </Col>
            <Col md={4} sm={12} xs={12} className="align-self-center team-visiting">
                <div className="text-center mt-2">Hosté:</div>
                <h2>{guestName}</h2>
            </Col>
        </Row>
    );
}