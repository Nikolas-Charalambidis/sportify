import React from 'react';
import { Heading } from "../../../../../basicComponents";
import * as yup from "yup";
import { Button, Form, Modal } from "react-bootstrap";
import { Field } from "../../../../../basicComponents";
import { Formik } from "formik";

export function InteractiveOvertimeModal({ showModal, closeModal, reset }) {

    const schema = yup.object().shape({
        minute: yup.number().integer().min(0).max(20).required(),
    });

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title className="modal-title">
                    <Heading size="md">Prodloužení</Heading>
                </Modal.Title>
            </Modal.Header>

            <Formik
                validationSchema={schema}
                initialValues={{
                    minute: '',
                }}
                onSubmit={values => {
                    closeModal(values, reset);
                }}
            >{({ handleSubmit, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Body>
                        Přejete si prodloužit zápas?
                            <Field label="Minuta" name="minute" type="number"
                                message="Vyplňte prosím čas prodloužení (0-20)"
                                isInvalid={!!errors.minute} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">Prodloužit</Button>
                        <Button variant="secondary" type="button" onClick={closeModal}>Zrušit</Button>
                    </Modal.Footer>

                </Form>
            )}
            </Formik>

        </Modal>

    );
}
