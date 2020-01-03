import React from 'react';
import {Field} from "../../../../basicComponents";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export function ShotsForm({handleSubmit, errors}) {
    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Field label="Počet střel" name="value" type="number"
                   message="Vyplňte prosím počet střel"
                   isInvalid={!!errors.value}/>
            <Button variant="primary" type="submit">
                Změnit počet střel
            </Button>
        </Form>
    );
}
