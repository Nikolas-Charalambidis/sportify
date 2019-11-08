import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import {Field} from "../../../../atoms";
import React, {useState} from "react";
import {Heading} from '../../../../atoms';
import * as yup from "yup";
import {CreateTeam} from "../../../../api/team/teamClient_v1";

export function CreateTeamModal({api, id_user, show, handleClose}) {
    const schemaCreateTeam = yup.object().shape({
        teamName: yup.string().required(),
    });

    const [teamType, setTeamType] = useState('profi');
    const handleChangeTeamType = (event) => setTeamType(event);

    const [teamSport, setTeamSport] = useState(1);
    const handleChangeTeamSport = (event) => setTeamSport(event);

    return (
        <Modal show={show} onHide={handleClose}>
            <Formik
                validationSchema={schemaCreateTeam}
                initialValues={{teamName: ''}}
                onSubmit={values => {
                    CreateTeam(api, id_user, values, teamSport, teamType);
                }}
            >{({handleSubmit, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title className="modal-title">
                            <Heading size="md">Tvorba týmu</Heading>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Field label="Název týmu" name="teamName" type="text"
                               message="Vyplňte prosím název týmu"
                               isInvalid={!!errors.teamName}/>
                        <Form.Group controlId="teamSport">
                            <Form.Label>Sport</Form.Label>
                            <Form.Control name="teamSport" as="select"
                                          onChange={event => handleChangeTeamSport(event.target.value)}>
                                <option value="1">Hokej</option>
                                <option value="2">Florbal</option>
                                <option value="3">Hokejbal</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="teamType">
                            <Form.Label>Typ týmu</Form.Label>
                            <Form.Control name="teamType" as="select"
                                          onChange={event => handleChangeTeamType(event.target.value)}>
                                <option value="profi">Profesionálové</option>
                                <option value="amatéři">Amatéři</option>
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Vytvořit tým
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
