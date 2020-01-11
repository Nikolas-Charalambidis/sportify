import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Field} from "../../../../basicComponents";
import {Formik} from "formik";
import {CustomSelect} from "../../../../basicComponents/Select";

export function AddGoalForm({ id_user, handleClose, addEvent, matchup, id_team, id_match, host, schema, interactive, timerState }) {  

    const [valueUser, setValueUser] = useState({id_user: id_user});
    const [valueAss1, setValueAss1] = useState(null);
    const [valueAss2, setValueAss2] = useState(null);

    return (
             <Formik
                validationSchema={schema}
                initialValues={{
                    id_user: id_user,
                    name: '',
                    type: "goal",
                    id_team: id_team,
                    id_assistance1: null,
                    name_assistance1: '',
                    id_assistance2: null,
                    name_assistance2: '',
                    minute: interactive ? Math.trunc(timerState / 1000 / 60) : '',
                    value: null,
                    host: host
                }}
                onSubmit={values => {
                    handleClose();
                    addEvent({...values, id_match: id_match});
                }}
            >{({handleSubmit, setFieldValue, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>

                    <Modal.Body>
                        {!interactive && (
                            <Field label="Minuta" name="minute" type="number"
                                   message="Vyplňte prosím minutu, kdy byl gól střelen v rozmezí 1-60"
                                isInvalid={!!errors.minute} />
                        )}
                        {interactive &&
                            <CustomSelect name="id_user" label="Střelec"
                                options={matchup}
                                getOptionLabel={option => `${option.name}`}
                                getOptionValue={option => `${option.id_user}`}
                                isSearchable={true}
                                onChange={options => {
                                    setFieldValue("id_user", options.id_user);
                                    setFieldValue("name", options.name);
                                    setValueUser(options);
                                    setValueAss1(null);
                                    setValueAss2(null);
                                }}
                            />
                        }
                        {(valueUser.id_user || !interactive) &&
                            <CustomSelect name="id_assistance1" label="Asistence 1"
                                          value={valueAss1}
                                          options={
                                              matchup.filter(item => item.id_user !== valueUser.id_user)
                                          }
                                          getOptionLabel={option => `${option.name}`}
                                          getOptionValue={option => `${option.id_user}`}
                                          isSearchable={true}
                                          onChange={options => {
                                              setFieldValue("id_assistance1", options.id_user);
                                              setFieldValue("name_assistance1", options.name);
                                              setValueAss1(options);
                                              setValueAss2(null);
                                          }}
                            />
                        }
                        {valueAss1 &&
                            <CustomSelect name="id_assistance2" label="Asistence 2"
                                          value={valueAss2}
                                          options={
                                              matchup.filter(item =>
                                                  item.id_user !== valueUser.id_user &&
                                                  item.id_user !== valueAss1.id_user
                                              )
                                          }
                                          getOptionLabel={option => `${option.name}`}
                                          getOptionValue={option => `${option.id_user}`}
                                          isSearchable={true}
                                          onChange={options => {
                                              setFieldValue("id_assistance2", options.id_user);
                                              setFieldValue("name_assistance2", options.name);
                                              setValueAss2(options);
                                          }}
                            />
                        }

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
