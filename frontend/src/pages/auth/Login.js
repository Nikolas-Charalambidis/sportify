import React from 'react';

import {Heading, MainSection} from '../../atoms';
import {TopNavigation} from '../../organisms/TopNavigation';
import {Row, Col, Form, Button, Breadcrumb} from "react-bootstrap";
import '../../assets/css/index.css';
import {Footer} from "../../organisms/Footer";
import {useApi} from '../../utils/api';
import {useAuth} from '../../utils/auth';
import {useHistory} from "react-router";
import {config} from '../../config';
import {Formik} from "formik";
import * as yup from "yup";
import {Field} from "../../atoms/Field";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export function Login() {
	const auth = useAuth();
	const api = useApi();
	const history = useHistory();
	const { user } = auth;

	if(user) {
		history.replace('/');
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
            <TopNavigation/>
            <MainSection>
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
                    initialValues={{  email: '', password: '' }}
                    onSubmit={values => { login(values); }}
                >{({ handleSubmit, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
						<Row>
							<Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
								<Field label="E-mail:" name="email" type="email" message="Vyplňte prosím Váš email" isInvalid={!!errors.email}/>
							</Col>
						</Row>
						<Row>
							<Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
								<Field label="Heslo:" name="password" type="password" message="Vyplňte prosím Vaše heslo" isInvalid={!!errors.password}/>
							</Col>
						</Row>
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
            </MainSection>
            <Footer/>
        </div>
    );
}