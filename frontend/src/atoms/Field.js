import React from 'react';
import { useField } from 'formik';

import {Form} from "react-bootstrap";

export function Field({ label, ...props }) {
    const [field, meta] = useField(props);

    return (
        <Form.Group controlId="name">
            <Form.Label>{label}</Form.Label>
            <Form.Control {...field} {...props}/>
            {console.log('label', label)}
            {console.log('props', props)}
            {console.log('field', field)}
            {console.log('meta', meta)}

            <Form.Control.Feedback type="invalid">
                {meta.error}
            </Form.Control.Feedback>

        </Form.Group>
    );
}