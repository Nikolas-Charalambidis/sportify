import React, { useState } from 'react';

import { Heading, MainSection } from '../../atoms';
import { TopNavigation } from '../../organisms/TopNavigation';
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Modal,
  Breadcrumb,
  Card,
  CardDeck,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { Footer } from '../../organisms/Footer';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Profile() {
  const [validated, setValidated] = useState(false);
  const [givenName, setGivenName] = useState('');
  const [lastName, setLastName] = useState('');
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confpassword, setConfpassword] = useState('');

  const onSave = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    form.checkValidity();
    setValidated(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
          <Breadcrumb.Item active>Administrace</Breadcrumb.Item>
          <Breadcrumb.Item active>Profil</Breadcrumb.Item>
        </Breadcrumb>
        <Heading>Profil</Heading>

        <Form validated={validated}>
          <Row>
            <Col className="d-xl-none text-center">
              <Image
                fluid
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfe80083d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfe80083d%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                roundedCircle
              />
            </Col>
            <Col lg={10}>
              <Row>
                <Col>
                  <Form.Group controlId="givenName">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="givenName"
                      placeholder="John"
                      value={givenName}
                      onChange={e => setGivenName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control readOnly defaultValue="email@example.com" />
                </Col>
              </Row>

              <Row>
                <Col lg={6}>
                  <Form.Group controlId="lastName">
                    <label>Příjmení</label>
                    <Form.Control
                      required
                      type="text"
                      name="givenName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Button
                    className="mt4"
                    type="button"
                    block
                    onClick={handleShow}
                  >
                    Změna hesla
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                      <Form>
                        <Form.Label>Stávající heslo</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          name="password"
                          placeholder="Stávající heslo"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                        <Form.Label>Nové heslo</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          name="newPassword"
                          placeholder="Nové heslo"
                          value={newpassword}
                          onChange={e => setNewpassword(e.target.value)}
                        />
                        <Form.Label>Potvrzení hesla</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          name="password"
                          placeholder="Potvrzení hesla"
                          isValid={newpassword === confpassword}
                          isInvalid={newpassword !== confpassword}
                          value={confpassword}
                          onChange={e => setConfpassword(e.target.value)}
                        />
                      </Form>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={handleClose}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
                <Col>
                  <Button className="mt4" type="button" block onClick={onSave}>
                    Uložit Profil
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col className="d-none d-lg-block">
              <Image
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfe80083d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfe80083d%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                roundedCircle
              />
            </Col>
          </Row>
        </Form>
        <Row className="mt-4">
          <Col lg={4}>
            <CardDeck>
              <Card>
                <Card.Header>
                  {' '}
                  <Row>
                    <Col>Tým 1</Col>
                    <Col className="text-right">
                      <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Fotbal</Tooltip>}>
                      <FontAwesomeIcon icon={Icons.faFutbol} size="2x" />
                      </OverlayTrigger>
                    </Col>
                  </Row>{' '}
                </Card.Header>
                <Row>
                  <Col>

                    <Card.Img
                      src="https://cdn.pixabay.com/photo/2015/09/15/21/26/cat-941821_1280.png"
                    />

                  </Col>
                </Row>
              </Card>
            </CardDeck>
          </Col>
        </Row>
      </MainSection>
      <Footer />
    </div>
  );
}
