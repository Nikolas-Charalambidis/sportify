import React, { useState } from 'react';

import { Heading, MainSection } from '../../atoms';
import { TopNavigation } from '../../organisms/TopNavigation';
import {Row, Col, Form, Button, Breadcrumb} from "react-bootstrap";
import '../../assets/css/index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {Footer} from "../../organisms/Footer";


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
				<Breadcrumb>
					<Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
					<Breadcrumb.Item active>Přihlásit se</Breadcrumb.Item>
				</Breadcrumb>
				<Heading className="pageHeading mt-4">Přihlásit se</Heading>
				<p className="text-center mb-5">Využívejte webovou aplikaci <strong>Sportify</strong> naplno. <br /> S vytvořeným účtem získáte přístup do správy Vašeho profilu, týmů, soutěží a interaktivnímu zápisu výsledků.</p>
				<Form id="loginForm" validated={validated}>
					<Form.Group as={Row} controlId="formBasicEmail justify-content-md-center">
						<Form.Label className="text-right col-md-offset-3" column lg={{ span: 1, offset: 4 }} md={{ span: 2, offset: 3 }} xs={{ span: 2 }}>
							Email:
						</Form.Label>
						<Col lg={{ span: 3 }} md={{ span: 4 }} xs={{ span: 10 }}>
							<Form.Control required type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formBasicPassword mt-5">
						<Form.Label className="text-right col-md-offset-3" column lg={{ span: 1, offset: 4 }} md={{ span: 2, offset: 3 }} xs={{ span: 2 }}>
							Heslo:
						</Form.Label>
						<Col lg={{ span: 3 }} md={{ span: 4 }} xs={{ span: 10 }}>
							<Form.Control required type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
						</Col>
					</Form.Group>
					<Row className="mt-4">
						<Col className="text-right">
							<Button variant="primary" type="button" onClick={onLogin}>Přihlásit <FontAwesomeIcon className="d-none d-sm-inline-block" icon={Icons.faCaretRight} size="1x" /></Button>
						</Col>
						<Col className="text-left">
							<Button variant="secondary" href="/register">Registrovat</Button>
						</Col>
					</Row>
					<Row className="mt-2">
						<Col lg={{ span: 2, offset: 4 }} md={{ span: 4, offset: 4 }} sm={{ offset: 2, span: 8}} className="text-center">
							<a className="blackHref" href="/#">Zapomenuté heslo</a>
						</Col>
					</Row>
				</Form>
			</MainSection>
			<Footer/>
		</div>
	);
}