import {Button, Col, Form, Row} from "react-bootstrap";
import {Field} from "../../basicComponents";
import React from "react";
import {NavLink as Link} from "react-router-dom";


export function LoginForm({handleSubmit, errors, showResetPasswordModal}) {

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Row>
                <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                    <Field label="E-mail:" name="email" type="email" message="Vyplňte prosím Váš email"
                           isInvalid={!!errors.email}/>
                </Col>
            </Row>

            <Row>
                <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                    <Field label="Heslo:" name="password" type="password" message="Vyplňte prosím Vaše heslo"
                           isInvalid={!!errors.password}/>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xl={{span: 2, offset: 4}} lg={{span: 3, offset: 3}} md={{span: 6, offset: 3}}>
                    <Button className="btn-block mb-3 mb-lg-0" variant="primary" type="submit">
                        Přihlásit
                    </Button>
                </Col>
                <Col xl={{span: 2, offset: 0}} lg={{span: 3, offset: 0}} md={{span: 6, offset: 3}}>
                    <Link className="text-decoration-none" to="/register">
                        <Button className="btn-block" variant="secondary" type="button">
                            Registrace
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="mt-2">
                <Col className="text-center">
                    <Link to="#" onClick={showResetPasswordModal}>
                        Zapomenuté heslo
                    </Link>
                </Col>
            </Row>
        </Form>
    )
}
