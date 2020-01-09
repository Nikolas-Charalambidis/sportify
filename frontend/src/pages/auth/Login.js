import React, {useState} from 'react';
import {Row, Col, Modal} from "react-bootstrap";
import {config} from '../../config';
import {Heading} from '../../basicComponents';
import {useApi} from '../../hooks/useApi';
import {useAuth} from '../../utils/auth';
import {useHistory} from "react-router";
import {Formik} from "formik";
import * as yup from "yup";
import {AccountAdvantages} from "../../basicComponents/AccountAdvantages";
import {ResetPasswordForm} from "../../organisms/auth/ResetPasswordForm";
import {LoginForm} from "../../organisms/auth/LoginForm";
import {LoginBreadcrumbs} from "../../organisms/breadcrumbs/LoginBreadcrumbs";

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
				history.replace('/administration');
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
				const { data } = response;
				window.flash(data.msg, 'danger');
			});
	}

    return (
        <div>
			<LoginBreadcrumbs />
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
				<LoginForm handleSubmit={handleSubmit} errors={errors} showResetPasswordModal={handleShow} />
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
					<ResetPasswordForm handleSubmit={handleSubmit} errors={errors} closeResetPasswordModal={handleClose}/>
                )}
                </Formik>
            </Modal>
            <AccountAdvantages/>
        </div>
    );
}