import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Field} from "../../../../atoms";
import {Formik} from "formik";
import {CustomSelect} from "../../../../atoms/Select";

export function AddGoalForm({id_user, handleClose, addEvent, matchup, id_team, id_match, host, schema}) {
    return (
             <Formik
                validationSchema={schema}
                initialValues={{
                    id_user: id_user,
                    type: "goal",
                    id_team: id_team,
                    id_match: id_match,
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
            >{({handleSubmit, setFieldValue, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>

                    <Modal.Body>
                        <Field label="Minuta" name="minute" type="number"
                               message="Vyplňte prosím minutu, kdy byl gól střelen v rozmezí 1-60"
                               isInvalid={!!errors.minute}/>

                        <CustomSelect name="id_assistance1" label="Asistence 1"
                                      options={matchup}
                                      getOptionLabel={option => `${option.name}`}
                                      getOptionValue={option => `${option.id_user}`}
                                      isSearchable={true}
                                      onChange={options => setFieldValue("id_assistance1", options.id_user)}
                        />
                        <CustomSelect name="id_assistance2" label="Asistence 2"
                                      options={matchup}
                                      getOptionLabel={option => `${option.name}`}
                                      getOptionValue={option => `${option.id_user}`}
                                      isSearchable={true}
                                      onChange={options => setFieldValue("id_assistance2", options.id_user)}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Přidat gól
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
