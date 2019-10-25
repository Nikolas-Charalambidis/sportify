import React, { useState } from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { Form, Button } from "react-bootstrap";


export function Login() {

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = event => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        form.checkValidity();
        setValidated(true);
    };

	return (
		<div>
			<TopNavigation/>
			<MainSection>
				<Heading>Login</Heading>
				<Form validated={validated}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>E-mail</Form.Label>
						<Form.Control required type="email" name="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Heslo</Form.Label>
						<Form.Control required type="password" name="password" placeholder="Heslo" value={password} onChange={e => setPassword(e.target.value)}/>
					</Form.Group>
					<a href="/#">Zapomenuté heslo</a>
					<Button variant="primary" type="button" onClick={onLogin}>Přihlásit</Button>
					<Button variant="secondary" href="#">Registrovat</Button>
				</Form>
			</MainSection>
		</div>
	);
}