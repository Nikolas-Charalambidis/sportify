import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import {ChangePassword} from "../../../api/userClient_v1";
import {Field} from "../../../atoms";
import React from "react";
import * as yup from "yup";
import {Heading} from '../../../atoms';

export function UserChangePasswordModal({ api, id_user, show, handleClose }){
    const schemaChangePassword = yup.object().shape({
        oldPassword: yup.string().required(),
        newPassword1: yup.string().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){6}/).required(),
        newPassword2: yup.string().required().oneOf([yup.ref('newPassword1')]),
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <Formik
                validationSchema={schemaChangePassword}
                initialValues={{oldPassword: '', newPassword1: '', newPassword2: ''}}
                onSubmit={values => {
                    ChangePassword(api, id_user, values);
                    handleClose();
                }}
            >{({handleSubmit, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title className="modal-title">
                            <Heading size="md">Změna hesla</Heading>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Field label="Stávající heslo" name="oldPassword" type="password"
                               message="Vyplňte prosím Vaše stávající heslo"
                               isInvalid={!!errors.oldPassword}/>
                        <Field label="Nové heslo" name="newPassword1" type="password"
                               message="Heslo musí obsahovat alespoň 6 znaků a alespoň 1 velké písmeno, 1 malé písmeno a 1 číslo."
                               isInvalid={!!errors.newPassword1}/>
                        <Field label="Potvrzení hesla" name="newPassword2" type="password"
                               message="Hesla se musí shodovat" isInvalid={!!errors.newPassword2}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Změnit heslo
                        </Button>
                        <Button variant="secondary" type="button" onClick={handleClose}>
                            Zavřít
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
            </Formik>
        </Modal>
    )
}
