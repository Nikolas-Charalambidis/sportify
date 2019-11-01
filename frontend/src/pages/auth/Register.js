import React from 'react';

import {Heading, MainSection} from '../../atoms';
import {TopNavigation} from '../../organisms/TopNavigation';
import {Form, Button, Row, Col, Breadcrumb} from "react-bootstrap";
import {useHistory} from "react-router";
import {useAuth} from "../../utils/auth";
import {Footer} from "../../organisms/Footer";
import {useApi} from "../../utils/api";
import {config} from '../../config';
import * as yup from "yup";
import {Formik} from "formik";
import {Field} from "../../atoms/Field";

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
    const { user } = useAuth();
    const api = useApi();

    if(user) {
        history.replace('/');
    }

    const register = (name, surname, email, password1, password2) => {
        api
            .post(`http://${config.API_BASE_PATH}/api/v1/users`, {name: name, surname: surname, email: email, password1: password1, password2: password2})
            .then(() => {
                window.flash("Byl jste úspěšně registrován. Ověřte prosím svůj email odkazem, který Vám byl zaslán na email uvedený při registraci.", 'success');
                history.replace('/');
            })
            .catch(( { response } ) => {
                const { data, status } = response;
                switch (status) {
                    case 400:
                        window.flash(data.message, 'danger');
                        break;
                    case 500:
                        window.flash(data.message, 'warning');
                        break;
                    default:
                        window.flash(data.message, 'danger');
                        break;
                }
            });
    };

    return (
        <div>
            <TopNavigation/>
            <MainSection>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                    <Breadcrumb.Item active>Registrace</Breadcrumb.Item>
                </Breadcrumb>
                <Heading className="pageHeading mt-4">Registrace</Heading>
                <p className="text-center mb-5">Po dokončení registrace Vám bude zaslán potvrzovací e-mail. <br/>Po
                    potvrzení tohoto e-mailu se budete moci přihlásit do Vašeho vytvořeného účtu.</p>
                <Formik
                    validationSchema={schema}
                    initialValues={{ name: '', surname: '',  email: '', nickname: '',  password1: '', password2: '' }}
                    onSubmit={values => { register(values); }}
                >{({ handleSubmit, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                                <Field label="E-mail" name="email" type="email" message="Vyplňte Vaši e-mailovou adresu." isInvalid={!!errors.email}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                                <Field label="Jméno" name="name" type="text" message="Vyplňte Vaše jméno." isInvalid={!!errors.name}/>
                            </Col>
                            <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                                <Field label="Příjmení" name="surname" type="text" message="Vyplňte Vaše příjmení." isInvalid={!!errors.surname}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                                <Field label="Heslo" name="password1" type="password" message="Heslo musí obsahovat alespoň 6 znaků a alespoň 1 velké písmeno, 1 malé písmeno a 1 číslo." isInvalid={!!errors.password1}/>
                            </Col>
                            <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                                <Field label="Heslo znovu" name="password2" type="password" message="Hesla se musí shodovat" isInvalid={!!errors.password2}/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xl={{span: 4, offset: 4}} lg={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                                <Button className="btn-block mb-3 mb-lg-0" variant="primary" type="submit" >
                                    Vytvořit účet
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    )}
                </Formik>
            </MainSection>
            <Footer/>
        </div>
    );
}