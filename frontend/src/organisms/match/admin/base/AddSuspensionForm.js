import React from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { Field } from "../../../../basicComponents";
import { Formik } from "formik";
import { CustomSelect } from "../../../../basicComponents/Select";
import { suspensionTypesList } from "../../../../enums/enums";

export function AddSuspensionForm({ id_user, handleClose, addEvent, matchup, id_team, id_match, host, schema, interactive, timerState }) {

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                id_user: id_user,
                name: '',
                type: suspensionTypesList[0].id,
                id_team: id_team,
                id_match: id_match,
                id_assistance1: null,
                id_assistance2: null,
                minute: interactive ? Math.trunc(timerState / 1000 / 60) : '',
                value: null,
                host: host
            }}
            onSubmit={values => {
                handleClose();
                addEvent(values);
            }}
        >{({ handleSubmit, setFieldValue, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>

                <Modal.Body>
                    {!interactive && (
                        <Field label="Minuta" name="minute" type="number"
                            message="Vyplňte prosím minutu, kdy byl trest udělen v rozmezí 1-60"
                            isInvalid={!!errors.minute} />
                    )}

                    {interactive && (
                        <CustomSelect name="id_user" label="Hráč"
                            options={matchup}
                            getOptionLabel={option => `${option.name}`}
                            getOptionValue={option => `${option.id_user}`}
                            isSearchable={true}
                            onChange={options => {
                                setFieldValue("id_user", options.id_user);
                                setFieldValue("name", options.name);
                            }}
                        />
                    )}

                    <CustomSelect name="type" label="Typ trestu"
                        options={suspensionTypesList}
                        getOptionLabel={option => `${option.value}`}
                        getOptionValue={option => `${option.id}`}
                        isSearchable={true}
                        placeholder={suspensionTypesList[0].value}
                        onChange={option => setFieldValue("type", option.id)}
                    />

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Přidat trest
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
