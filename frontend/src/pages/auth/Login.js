import React, {useState} from 'react';

import {Heading, MainSection} from '../../atoms';
import {TopNavigation} from '../../organisms/TopNavigation';
import {Row, Col, Form, Button, Breadcrumb} from "react-bootstrap";
import '../../assets/css/index.css';
import {Footer} from "../../organisms/Footer";
import {useApi} from '../../utils/api';
import {useAuth} from '../../utils/auth';
import {useHistory} from "react-router";

export function Login() {

    const api = useApi();
    const history = useHistory();
    const auth = useAuth();

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = event => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        form.checkValidity();
        setValidated(true);

        if (validated) {
            login(email, password);
        }
    };

    const login = (email, password) => {
        api
            .post("http://localhost:3001/api/v1/auth/login", {email: email, password: password})
            .then(({data}) => {
                const {token, user_id} = data;
                auth.signin({token, user_id});
                history.replace('/administration/profile');

                // Here you can receive the token and user_id from the LocalStorage, which is persisted
                // View at: Chrome -> Inspect -> Application -> LocalStorage
                console.log(window.localStorage.getItem('sportify-auth'));
            });
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
                <p className="text-center mb-5">Využívejte webovou aplikaci <strong>Sportify</strong> naplno. <br/> S
                    vytvořeným účtem získáte přístup do správy Vašeho profilu, týmů, soutěží a interaktivnímu zápisu
                    výsledků.</p>
                <Form id="loginForm" validated={validated}>
                    <Form.Group controlId="formBasicEmail">
                        <Row>
                            <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                                <Form.Label>E-mail:</Form.Label>
                            </Col>
                            <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                                <Form.Control required type="email" name="email" value={email}
                                              onChange={e => setEmail(e.target.value)}/>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Row>
                            <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                                <Form.Label>Heslo:</Form.Label>
                            </Col>
                            <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                                <Form.Control required type="password" name="password" value={password}
                                              onChange={e => setPassword(e.target.value)}/>
                            </Col>
                        </Row>
                    </Form.Group>


                    <Row className="mt-4">
                        <Col xl={{span: 2, offset: 4}} lg={{span: 3, offset: 3}} md={{span: 6, offset: 3}} className="">
                            <Button className="btn-block mb-3 mb-lg-0" variant="primary" type="button"
                                    onClick={onLogin}>Přihlásit</Button>
                        </Col>
                        <Col xl={{span: 2, offset: 0}} lg={{span: 3, offset: 0}} md={{span: 6, offset: 3}}>
                            <Button className="btn-block" variant="secondary" type="button"
                                    href="/register">Registrace</Button>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="text-center">
                            <a className="blackHref" href="/#">Zapomenuté heslo</a>
                        </Col>
                    </Row>
                </Form>
            </MainSection>
            <Footer/>
        </div>
    );
}