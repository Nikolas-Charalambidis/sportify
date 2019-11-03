import React from 'react';
import {Heading} from '../../atoms';
import {Row, Col, Form, Button, Breadcrumb} from "react-bootstrap";
import {Footer} from "../../organisms/Footer";
import {useApi} from '../../utils/api';
import {useAuth} from '../../utils/auth';
import {useHistory} from "react-router";
import {config} from '../../config';
import {Formik} from "formik";
import * as yup from "yup";
import {Field} from "../../atoms/Field";
import { useParams } from 'react-router-dom';

const schema = yup.object().shape({
    password1: yup.string().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){6}/).required(),
    password2: yup.string().required().oneOf([yup.ref('password1')])
});

export function ResetPassword() {
    const auth = useAuth();
    const params =  useParams();
    const api = useApi();
    const history = useHistory();
    const { user } = auth;

    if(user) {
        history.replace('/');
    }

    function resetPassword(values, params) {
        const { password1, password2 } = values;
        const { id_user, hash } = params;
        api
            .post(`${config.API_BASE_PATH}/auth/resetPassword`,
                {id_user: id_user, hash: hash, password1: password1, password2: password2})
            .then(() => {
                history.replace('/login');
                window.flash("Heslo bylo úspěšně změněno", 'success');
            })
            .catch(( { response } ) => {
                const { data, status } = response;
                if(status === 498){
                    window.flash(data.msg, 'warning', 15000, data.link);
                } else {
                    window.flash(data.msg, 'danger');
                }
            });
    }
    return (
        <div>
                <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Obnova hesla</Breadcrumb.Item>
            </Breadcrumb>
            <Heading className="pageHeading mt-4">Obnova hesla</Heading>
            <br/>
            <Formik
                validationSchema={schema}
                initialValues={{  email: '', password: '' }}
                onSubmit={values => { resetPassword(values, params); }}
            >{({ handleSubmit, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                            <Field label="Nové heslo" name="password1" type="password" message="Heslo musí obsahovat alespoň 6 znaků a alespoň 1 velké písmeno, 1 malé písmeno a 1 číslo." isInvalid={!!errors.password1}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                            <Field label="Heslo znovu" name="password2" type="password" message="Hesla se musí shodovat" isInvalid={!!errors.password2}/>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={{span: 4, offset: 4}} lg={{span: 4, offset: 4}} md={{span: 6, offset: 3}}>
                            <Button className="btn-block mb-3 mb-lg-0" variant="primary" type="submit">
                                Obnovit heslo
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
            <Footer/>
        </div>
    );
}