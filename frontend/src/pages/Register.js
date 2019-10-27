import React, { useState } from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { Form, Button, Row, Col } from "react-bootstrap";

export function Register() {

    const [validated, setValidated] = useState(false);
    const [givenName, setGivenName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidation, setPasswordValidation] = useState("")

    const onLogin = event => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        form.checkValidity();
        setValidated(true);
    };
    
    return (
        <div>
            <TopNavigation />
            <MainSection>
                <Heading>Registrace</Heading>
                <Form validated={validated}>

                    <Row>
                        <Col>
                            <Form.Group controlId="givenName">
                                <Form.Label>Jméno</Form.Label>
                                <Form.Control required type="text" name="givenName" placeholder="Jméno" value={givenName} onChange={e => setGivenName(e.target.value)} />
                                <Form.Control.Feedback type="invalid">Vyplňte Vaše jméno.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="lastName">
                                <Form.Label>Příjmení</Form.Label>
                                <Form.Control required type="text" name="lastName" placeholder="Příjmení" value={lastName} onChange={e => setLastName(e.target.value)} />
                                <Form.Control.Feedback type="invalid">Vyplňte Vaše příjmení.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="nickname">
                        <Form.Label>Přezdívka</Form.Label>
                        <Form.Control required type="text" name="nickname" placeholder="Přezdívka" value={nickname} onChange={e => setNickname(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Vyplňte Vaši přezdívku.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control required type="email" name="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Vyplňte Vaši e-mailovou adresu.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control minLength="6" required type="password" name="password" placeholder="Heslo" value={password} onChange={e => setPassword(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Heslo musí obsahovat alespoň 6 znaků.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="passwordValidation">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control isValid={password === passwordValidation && passwordValidation.length >= 6} isInvalid={password !== passwordValidation}
                            required type="password" name="passwordValidation" placeholder="Potvrzení hesla" value={passwordValidation} onChange={e => setPasswordValidation(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Hesla se musí shodovat.</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={onLogin}>Registrovat</Button>

                </Form>                
            </MainSection>
        </div>
    );
}