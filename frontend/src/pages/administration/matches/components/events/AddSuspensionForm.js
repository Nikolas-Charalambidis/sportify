import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Field} from "../../../../../atoms";
import {Formik} from "formik";
import {CustomSelect} from "../../../../../atoms/Select";

const suspensions = [
    {id_suspension: "suspension_2", suspension: "suspension_2"},
    {id_suspension: "suspension_2_2", suspension: "suspension_2_2"},
    {id_suspension: "suspension_5", suspension: "suspension_5"},
    {id_suspension: "suspension_pp", suspension: "suspension_pp"},
    {id_suspension: "suspension_pp_end", suspension: "suspension_pp_end"},
    {id_suspension: "suspension_penalty", suspension: "suspension_penalty"},
];

export function AddSuspensionForm({id_user, handleClose, addEvent, id_team, id_match, host, schema}) {
    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                id_user: id_user,
                type: suspensions[0].id_suspension,
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
                                  options={suspensions}
                                  getOptionLabel={option => `${option.suspension}`}
                                  getOptionValue={option => `${option.id_suspension}`}
                                  isSearchable={true}
                                  placeholder={suspensions[0].suspension}
                                  onChange={options => setFieldValue(options.id_suspension)}
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
