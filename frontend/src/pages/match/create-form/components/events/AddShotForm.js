import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Field} from "../../../../../atoms";
import {Formik} from "formik";

export function AddShotForm({id_user, handleClose, addEvent, id_team, host, schema}) {
    return (

        <Formik
            validationSchema={schema}
            initialValues={{
                id_user: id_user,
                type: "value",
                id_team: id_team,
                id_match: null,
                id_assistance1: null,
                id_assistance2: null,
                minute: '',
                value: null,
                host: host
            }}
            onSubmit={values => {
                handleClose();
                addEvent(values);
            }}
        >{({handleSubmit, errors}) => (
            <Form noValidate onSubmit={handleSubmit}>

                <Modal.Body>
                    <Field label="Minuta" name="minute" type="number" focus
                           message="Vyplňte prosím v jake minute padla strela"
                           isInvalid={!!errors.minute}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" type="submit" >
                        Přidat strely
                    </Button>
                    <Button variant="secondary" type="button" onClick={handleClose}>
                        Zavřít
                    </Button>
                </Modal.Footer>

            </Form>
        )}
        </Formik>
    );
}
