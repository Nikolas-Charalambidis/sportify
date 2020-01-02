import {Button, Form, Modal} from "react-bootstrap";
import {Field} from "../../basicComponents";
import React from "react";


export function ResetPasswordForm({handleSubmit, errors, closeResetPasswordModal}) {

    return (
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
                <Button variant="secondary" type="button" onClick={closeResetPasswordModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Form>
    )
}
