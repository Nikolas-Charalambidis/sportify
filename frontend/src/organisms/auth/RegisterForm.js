import {Button, Col, Form, Row} from "react-bootstrap";
import {Field} from "../../basicComponents";
import React from "react";

export function RegisterForm({handleSubmit, errors}) {

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Row>
                <Col xl={{span: 4, offset: 4}} lg={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                    <Field label="E-mail" name="email" type="email"
                           message="Vyplňte Vaši e-mailovou adresu." isInvalid={!!errors.email}/>
                </Col>
            </Row>

            <Row>
                <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                    <Field label="Jméno" name="name" type="text" message="Vyplňte Vaše jméno."
                           isInvalid={!!errors.name}/>
                </Col>
                <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                    <Field label="Příjmení" name="surname" type="text" message="Vyplňte Vaše příjmení."
                           isInvalid={!!errors.surname}/>
                </Col>
            </Row>

            <Row>
                <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                    <Field label="Heslo" name="password1" type="password"
                           message="Heslo musí obsahovat alespoň 6 znaků a alespoň 1 velké písmeno, 1 malé písmeno a 1 číslo."
                           isInvalid={!!errors.password1}/>
                </Col>
                <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                    <Field label="Heslo znovu" name="password2" type="password"
                           message="Hesla se musí shodovat" isInvalid={!!errors.password2}/>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xl={{span: 4, offset: 4}} lg={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                    <Button className="btn-block mb-3 mb-lg-0" variant="primary" type="submit">
                        Vytvořit účet
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
