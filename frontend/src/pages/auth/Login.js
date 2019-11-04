import React, {useState} from 'react';

import {NavLink as Link} from "react-router-dom";
import {Row, Col, Form, Button, Breadcrumb, Modal} from "react-bootstrap";
import {config} from '../../config';
import {Heading} from '../../atoms';
import {useApi} from '../../hooks/useApi';
import {useAuth} from '../../utils/auth';
import {useHistory} from "react-router";
import {Formik} from "formik";
import {Field} from "../../atoms/Field";
import * as yup from "yup";
import {AccountAdvantages} from "./components/AccountAdvantages";

const schemaLogin = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const schemaResetPassword = yup.object().shape({
	email: yup.string().email().required(),
});

export function Login() {
    const auth = useAuth();
    const api = useApi();
    const history = useHistory();
    const {user} = auth;

    if (user) {
        history.replace('/');
    }

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	function login(values) {
		const { email, password } = values;
		api
			.post(`${config.API_BASE_PATH}/auth/login`, {email: email, password: password})
			.then(({ data }) => {
				const { token, user } = data;
				auth.signin( {token, user} );
				history.replace('/administration/profile');
			})
			.catch(( { response } ) => {
				const { data } = response;
				window.flash(data.msg, 'danger');
			});
	}

	function resetPassword(values) {
		const { email } = values;
		api
			.post(`${config.API_BASE_PATH}/auth/resetLink`, {email: email})
			.then(() => {
				setShow(false);
				window.flash("Link pro reset hesla Vám byl zaslán na email", 'success');
			})
			.catch(( { response } ) => {
				const { data, status } = response;
				switch (status) {
					case 400:
						window.flash(data.msg, 'danger');
						break;
					case 404:
						window.flash(data.msg, 'danger');
						break;
					case 403:
						window.flash(data.msg, 'warning');
						break;
					default:
						window.flash("Neočekávaná chyba", 'danger');
						break;
				}
			});
	}

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><span className="active">Přihlásit se</span></li>
            </Breadcrumb>
            <Heading size="xl" className="mt-4">Přihlásit se</Heading>
            <Row>
                <Col lg={{span: 8, offset: 2}}>
                    <p className="text-center mb-5">Využívejte webovou aplikaci <strong>Sportify</strong> naplno. S
                        vytvořeným účtem získáte přístup do správy Vašeho profilu, týmů, soutěží a interaktivnímu zápisu
                        výsledků.</p>
                </Col>
            </Row>

            <Formik
                validationSchema={schemaLogin}
                initialValues={{email: '', password: ''}}
                onSubmit={values => {
                    login(values);
                }}
            >{({handleSubmit, errors}) => (
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
                            <Link to="#" onClick={handleShow}>
                                Zapomenuté heslo
                            </Link>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
            <Modal show={show} onHide={handleClose}>
                <Formik
                    validationSchema={schemaResetPassword}
                    initialValues={{ email: '' }}
                    onSubmit={values => {
                    	resetPassword(values);
						setShow(false);
                    }}
                >{({  handleSubmit, errors  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Header>
                            <Modal.Title className="modal-title">
                                Reset hesla
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Field label="Váš email" name="email" type="email" message="Vyplňte prosím svůj email" isInvalid={!!errors.email}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Odeslat link
                            </Button>
                            <Button variant="secondary" type="button" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
                </Formik>
            </Modal>
            <AccountAdvantages/>
        </div>
    );
}