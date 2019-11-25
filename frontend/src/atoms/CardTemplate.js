import {Card, CardDeck, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from "react-router";
import {Heading} from "./index";

export function CardTemplate({title, subtitle, pictureHeader, tooltipPictureHeader, mainPicture, textHeader, redirect}) {
    let history = useHistory();

    function onRedirect() {
        history.push(redirect);
    }

    return (
        <Col lg={4} md={6} sm={12} className="mt-4">
            <CardDeck>
                <Card onClick={onRedirect}>
                    <Card.Header>
                        <Row className="align-items-center">
                            <Col lg={10} sm={10} xs={9}>
                                <Row><Heading size="md" className="cardTitle">{title}</Heading></Row>
                                <Row>{subtitle}</Row>
                            </Col>
                            <Col lg={2} sm={2} xs={3} className="text-right">
                                <OverlayTrigger
                                    overlay={<Tooltip id="tooltip-disabled">{tooltipPictureHeader}</Tooltip>}>
                                    <FontAwesomeIcon icon={pictureHeader} size="2x"/>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Row>
                        <Col className="text-center">
                            <Card.Img style={{height: '150px', width: 'auto'}} src={mainPicture}/>
                            {(textHeader) && (
                                <Card.Footer>
                                    {textHeader && (
                                        <label>{textHeader}</label>
                                    )}
                                </Card.Footer>
                            )}
                        </Col>
                    </Row>
                </Card>
            </CardDeck>
        </Col>
    );
}
