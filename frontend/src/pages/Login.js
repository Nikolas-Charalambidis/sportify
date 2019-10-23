import React, { useState } from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { Form, Button } from "react-bootstrap";


export function Login() {

    const [validated, setValidated] = useState(false);

    var email = "";
    var password = "";

    const onLogin = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <div>
            <TopNavigation />
            <MainSection>
                <Heading>Login</Heading>
                <Form validated={validated}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control required type="email" name="email" placeholder="E-mail" ref={(input) => { email = input; }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control required type="password" name="password" placeholder="Heslo" ref={(input) => { password = input; }} />
                    </Form.Group>
                    <a href="#">Zapomenuté heslo</a>
                    <Button variant="primary" type="button" onClick={onLogin}>Pøihlásit</Button>
                    <Button variant="secondary" href="#">Registrovat</Button>
                </Form>
            </MainSection>
        </div>
    );
}