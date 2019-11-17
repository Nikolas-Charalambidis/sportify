import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Field, Heading} from "../../../../../atoms";
import {useApi} from "../../../../../hooks/useApi";
import {Formik} from "formik";
import * as yup from "yup";
import {addEvent} from "../../../../../api/events/eventClient_v1";

const schema = yup.object().shape({
    id_user: yup.number().nullable(),
    type: yup.string().required(),
    id_team: yup.number().required(),
    id_match: yup.number().required(),
    id_assistance1: yup.number().nullable(),
    id_assistance2: yup.number().nullable(),
    minute: yup.number().integer().min(1).max(60).required(),
    value: yup.number().required(),
    host: yup.number().required(),
});

export function AddShotModal({show, handleClose, id_team, id_match, host, fetchEvents}) {
    const api = useApi();

    const handleAddEvent = async (values) => {
        const result = await addEvent(api, values);
        if(result) {
            fetchEvents();
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title className="modal-title">
                    <Heading size="md">Přidat střelu</Heading>
                </Modal.Title>
            </Modal.Header>
            <Formik
                validationSchema={schema}
                initialValues={{
                    id_user: null,
                    type: "shot",
                    id_team: id_team,
                    id_match: id_match,
                    id_assistance1: null,
                    id_assistance2: null,
                    minute: '',
                    value: 1,
                    host: host
                }}
                onSubmit={values => {
                    handleClose();
                    handleAddEvent(values).then();
                }}
            >{({handleSubmit, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Field label="Minuta" name="minute" type="number"
                               message="Vyplňte prosím minutu, kdy byla střela provedena v rozmezí 1-60"
                               isInvalid={!!errors.minute}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Přidat střelu
                        </Button>
                        <Button variant="secondary" type="button" onClick={handleClose}>
                            Zrušit
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
            </Formik>
        </Modal>
    );
}
