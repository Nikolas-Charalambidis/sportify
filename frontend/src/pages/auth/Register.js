import React, {useState} from 'react';

import {Heading, MainSection} from '../../atoms';
import {TopNavigation} from '../../organisms/TopNavigation';
import {Form, Button, Row, Col, Breadcrumb} from "react-bootstrap";
import {useHistory} from "react-router";
import {useAuth} from "../../utils/auth";
import {Footer} from "../../organisms/Footer";
import {useApi} from "../../utils/api";
import {config} from '../../config';

export function Register() {
    const history = useHistory();
    const { user } = useAuth();
    const api = useApi();

    if(user) {
        history.replace('/');
    }

    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const onRegister = event => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (event.currentTarget.checkValidity()) {
            register(name, surname, email, password1, password2);
        }
    };

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

                <Form noValidate validated={validated} onSubmit={onRegister}>
                    <Row>
                        <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="name">
                                <Form.Label>Jméno</Form.Label>
                                <Form.Control required type="text" name="name" value={name}
                                              onChange={e => setName(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Vyplňte Vaše jméno.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="surname">
                                <Form.Label>Příjmení</Form.Label>
                                <Form.Control required type="text" name="surname" value={surname}
                                              onChange={e => setSurname(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Vyplňte Vaše příjmení.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control required type="email" name="email" value={email}
                                              onChange={e => setEmail(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Vyplňte Vaši e-mailovou adresu.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="nickname">
                                <Form.Label>Přezdívka</Form.Label>
                                <Form.Control required type="text" name="nickname" value={nickname}
                                              onChange={e => setNickname(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Vyplňte Vaši přezdívku.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={{span: 4, offset: 2}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="password1">
                                <Form.Label>Heslo</Form.Label>
                                <Form.Control minLength="6" required type="password" name="password1" value={password1}
                                              isValid={/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(password1)}
                                              onChange={e => setPassword1(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Heslo musí obsahovat alespoň 6 znaků a alespoň 1 velké písmeno, 1 malé písmeno a 1 číslo.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xl={{span: 4, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                            <Form.Group controlId="passwordValidation">
                                <Form.Label>Heslo znovu</Form.Label>
                                <Form.Control  required type="password" name="password2" value={password2}
                                    isValid={password1 === password2}
                                    isInvalid={password1 !== password2}
                                    onChange={e => setPassword2(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Hesla se musí shodovat
                                </Form.Control.Feedback>
                            </Form.Group>
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
            </MainSection>
            <Footer/>
        </div>
    );
}