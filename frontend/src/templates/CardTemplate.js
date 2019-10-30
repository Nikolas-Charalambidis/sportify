import {
  Card,
  CardDeck,
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export function CardTemplate({ nazev, sport, logo, icon, stav, pozice }) {
  return (
    <Col lg={3} className="mt-4">
      <CardDeck>
        <Card>
          <Card.Header>
            <Row className="align-items-center">
              <Col>
                <Row>{nazev}</Row>
                <Row>{pozice}</Row>
              </Col>
              <Col className="text-right">
                <OverlayTrigger
                  overlay={<Tooltip id="tooltip-disabled">{sport}</Tooltip>}
                >
                  <FontAwesomeIcon icon={icon} size="2x" />
                </OverlayTrigger>
              </Col>
            </Row>
          </Card.Header>
          <Row>
            <Col className="text-center">
              <Card.Img style={{ height: '150px', width: 'auto' }} src={logo} />
              <Card.Footer>{stav}</Card.Footer>
            </Col>
          </Row>
        </Card>
      </CardDeck>
    </Col>
  );
}
