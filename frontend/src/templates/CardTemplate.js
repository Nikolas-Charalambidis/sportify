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

// temporary CSS styles
const footerInfo = {
    textAlign: 'left',
};

const footerLeftLabel = {
    width: '65%',
}

const footerRightLabel = {
    width: '35%',
    fontWeight: '600',
};

const footerScore = {
    fontSize: '24px',
    fontWeight: '600',
};

const headerDate = {
    fontSize: '14px',
    color: '#969696',
};

export function CardTemplate({ datum, nazev, podnazev, sport, logo, icon, stav, bodyAsistence, trest, vysledekZapasu }) {
  return (
    <Col lg={3} className="mt-4">
      <CardDeck>
        <Card>
          <Card.Header>
            {datum && (
                <Row><Col style={headerDate}>{datum}</Col></Row>
                )}            
            <Row className="align-items-center">                          
              <Col>
                <Row>{nazev}</Row>
                <Row>{podnazev}</Row>
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
                {(stav || bodyAsistence || trest || vysledekZapasu) && (
                    <Card.Footer>
                        {stav && (
                            <label>{stav}</label>
                        )}

                        {bodyAsistence && (
                            <div style={footerInfo}>
                                <label style={footerLeftLabel}>Body/Asistence:</label>
                                <label style={footerRightLabel}>{bodyAsistence}</label>
                            </div>
                        )}

                        {trest && (
                            <div style={footerInfo}>
                                <label style={footerLeftLabel}>Trest 2m/5m:</label>
                                <label style={footerRightLabel}>{trest}</label>
                            </div>
                        )}

                        {vysledekZapasu && (
                            <label style={footerScore}>{vysledekZapasu}</label>
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
