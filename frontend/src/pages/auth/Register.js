import React from 'react';

import {Heading} from '../../atoms';
import {Form, Button, Row, Col, Breadcrumb} from "react-bootstrap";
import {useHistory} from "react-router";
import {useAuth} from "../../utils/auth";
import {useApi} from "../../utils/api";
import {config} from '../../config';
import * as yup from "yup";
import {Formik} from "formik";
import {Field} from "../../atoms/Field";
import {AccountAdvantages} from "./components/AccountAdvantages";
import {NavLink as Link} from "react-router-dom";

const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().required().email(),
    nickname: yup.string(),
    password1: yup.string().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){6}/).required(),
    password2: yup.string().required().oneOf([yup.ref('password1')])
});

export function Register() {
    const history = useHistory();
    const {user} = useAuth();
    const api = useApi();

    if (user) {
        history.replace('/');
    }

    const register = (values) => {
        const {name, surname, email, password1, password2} = values;
        api
            .post(`${config.API_BASE_PATH}/api/v1/users`, {name: name, surname: surname, email: email, password1: password1, password2: password2})
            .then(() => {
                window.flash("Byl jste úspěšně registrován. Ověřte prosím svůj email odkazem, který Vám byl zaslán na email uvedený při registraci.", 'success');
                history.replace('/login');
            })
            .catch(( { response } ) => {
                const { data } = response;
                window.flash(data.msg, 'danger');
            });
    };

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><span className="active">Registrace</span></li>
            </Breadcrumb>
            <Heading className="mt-4">Registrace</Heading>
            <Row>
                <Col lg={{span: 8, offset: 2}}>
                    <p className="text-center mb-5">Po dokončení registrace Vám bude zaslán potvrzovací e-mail. Po
                        potvrzení tohoto e-mailu se budete moci přihlásit do Vašeho vytvořeného účtu.</p>
                </Col>
            </Row>

            <Formik
                validationSchema={schema}
                initialValues={{name: '', surname: '', email: '', nickname: '', password1: '', password2: ''}}
                onSubmit={values => {
                    register(values);
                }}
            >{({handleSubmit, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
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
            )}
            </Formik>

            <AccountAdvantages/>
        </div>
    );
}