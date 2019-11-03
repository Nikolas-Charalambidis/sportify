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

export function CardTemplate({ date, title, subtitle, sport, logo, icon, state, pointsAssistance, penalty, matchResult}) {


  return (
    <Col lg={3} className="mt-4">
      <CardDeck>
        <Card>
          <Card.Header>
            {date && (
                <Row><Col style={headerDate}>{date}</Col></Row>
                )}            
            <Row className="align-items-center">                          
              <Col>
                <Row>{title}</Row>
                <Row>{subtitle}</Row>
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
                {(state || pointsAssistance || penalty || matchResult) && (
                    <Card.Footer>
                        {state && (
                            <label>{state}</label>
                        )}

                        {pointsAssistance && (
                            <div style={footerInfo}>
                                <label style={footerLeftLabel}>Body/Asistence:</label>
                                <label style={footerRightLabel}>{pointsAssistance}</label>
                            </div>
                        )}

                        {penalty && (
                            <div style={footerInfo}>
                                <label style={footerLeftLabel}>Trest 2m/5m:</label>
                                <label style={footerRightLabel}>{penalty}</label>
                            </div>
                        )}

                        {matchResult && (
                            <label style={footerScore}>{matchResult}</label>
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
