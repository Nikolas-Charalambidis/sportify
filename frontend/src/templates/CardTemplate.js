import { Card, CardDeck, Col, OverlayTrigger, Row,  Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export function CardTemplate({title, subtitle, pictureHeader, tooltipPictureHeader, mainPicture, textHeader}) {


  return (
    <Col lg={4} md={6} sm={12} xs={12} className="mt-4">
      <CardDeck>
        <Card>
          <Card.Header>
            <Row className="align-items-center">
              <Col lg={8} md={8} sm={8} xs={9}>
                <Row>{title}</Row>
                <Row>{subtitle}</Row>
              </Col>
              <Col className="text-right">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{tooltipPictureHeader}</Tooltip>}>
                  <FontAwesomeIcon icon={pictureHeader} size="2x" />
                </OverlayTrigger>
              </Col>
            </Row>
          </Card.Header>
          <Row>
            <Col className="text-center">
                <Card.Img style={{ height: '150px', width: 'auto' }} src={mainPicture} />
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
