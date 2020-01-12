import React from 'react';
import {Heading} from '../../basicComponents';
import {Row, Col} from "react-bootstrap";
import {useHistory} from "react-router";
import {useApi} from "../../hooks/useApi";
import {config} from '../../config';
import * as yup from "yup";
import {Formik} from "formik";
import {AccountAdvantages} from "../../basicComponents/AccountAdvantages";
import {RegisterForm} from "../../organisms/auth/RegisterForm";
import {RegisterBreadcrumbs} from "../../organisms/breadcrumbs/RegisterBreadcrumbs";

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
    const api = useApi();

    const register = (values) => {
        const {name, surname, email, password1, password2} = values;
        api
            .post(`${config.API_BASE_PATH}/users`, {name: name, surname: surname, email: email, password1: password1, password2: password2})
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
            <RegisterBreadcrumbs />

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
                <RegisterForm handleSubmit={handleSubmit} errors={errors} />
            )}
            </Formik>

            <AccountAdvantages/>
        </div>
    );
}