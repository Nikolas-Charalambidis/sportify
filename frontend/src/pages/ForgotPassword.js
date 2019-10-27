import React, { useState } from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { Form, Button } from 'react-bootstrap';

export function ForgotPassword() {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");

    const onReset = event => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        form.checkValidity();
        setValidated(true);
        console.log(email);
    };

    return (
        <div>
            <TopNavigation />
            <MainSection>
                <Heading>Reset hesla</Heading>
                <Form validated={validated}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control required type="email" name="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={onReset}>Resetovat</Button>
                </Form>
            </MainSection>
        </div>
    );
}
