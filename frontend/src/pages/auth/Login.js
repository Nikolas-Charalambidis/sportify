import React from 'react'

import {Heading} from '../../atoms'
import {Row, Col, Form, Button, Breadcrumb} from "react-bootstrap"
import '../../assets/css/index.css'
import {useApi} from '../../utils/api'
import {useAuth} from '../../utils/auth'
import {useHistory} from "react-router"
import {config} from '../../config'
import {Formik} from "formik"
import * as yup from "yup"

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

export function Login() {
    const auth = useAuth()
    const api = useApi()
    const history = useHistory()
    const {user} = auth

    if (user) {
        history.replace('/')
    }

    function login(values) {
		const { email, password } = values;
		api
			.post(`http://${config.API_BASE_PATH}/api/v1/auth/login`, {email: email, password: password})
			.then(({ data }) => {
				const { token, user } = data;
				auth.signin( {token, user} );
				history.replace('/administration/profile');
			})
			.catch(( { response } ) => {
				const { data, status } = response;
				switch (status) {
					case 400:
						window.flash(data.message, 'danger');
						break;
					case 404:
						window.flash(data.message, 'danger');
						break;
					case 403:
						window.flash(data.message, 'warning');
						break;
					default:
						window.flash(data.message, 'danger');
						break;
				}
			});
	}

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Přihlásit se</Breadcrumb.Item>
            </Breadcrumb>
            <Heading className="pageHeading mt-4">Přihlásit se</Heading>
            <p className="text-center mb-5">Využívejte webovou aplikaci <strong>Sportify</strong> naplno. <br/> S
                vytvořeným účtem získáte přístup do správy Vašeho profilu, týmů, soutěží a interaktivnímu zápisu
                výsledků.</p>
            <Formik
                validationSchema={schema}
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={values => {
                    const {email, password} = values
                    login(email, password)
                }}
            >{({handleSubmit, handleChange, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Row>
                            <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                                <Form.Label>E-mail:</Form.Label>
                            </Col>
                            <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                                <Form.Control type="email"
                                              name="email"
                                              onChange={handleChange}
                                              isInvalid={!!errors.email}/>
                                <Form.Control.Feedback type="invalid">
                                    Vyplňte prosím Váš email
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Row>
                            <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                                <Form.Label>Heslo:</Form.Label>
                            </Col>
                            <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                                <Form.Control type="password"
                                              name="password"
                                              onChange={handleChange}
                                              isInvalid={!!errors.password}/>
                                <Form.Control.Feedback type="invalid">
                                    Vyplňte prosím Vaše heslo
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Row className="mt-4">
                        <Col xl={{span: 2, offset: 4}} lg={{span: 3, offset: 3}} md={{span: 6, offset: 3}}>
                            <Button className="btn-block mb-3 mb-lg-0" variant="primary" type="submit">
                                Přihlásit
                            </Button>
                        </Col>
                        <Col xl={{span: 2, offset: 0}} lg={{span: 3, offset: 0}} md={{span: 6, offset: 3}}>
                            <Button className="btn-block" variant="secondary" type="button" href="/register">
                                Registrace
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="text-center">
                            <a className="blackHref" href="/#">Zapomenuté heslo</a>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
        </div>
    )
}