import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Field} from "../../../../atoms";
import {Formik} from "formik";
import {CustomSelect} from "../../../../atoms/Select";
import {suspensionTypesList} from "../../../../enums/enums";

export function AddSuspensionForm({id_user, handleClose, addEvent, id_team, id_match, host, schema}) {
    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                id_user: id_user,
                type: suspensionTypesList[0].id,
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
                    <Field label="Minuta" name="minute" type="number" focus
                           message="Vyplňte prosím minutu, kdy byl trest udělen v rozmezí 1-60"
                           isInvalid={!!errors.minute}/>

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
