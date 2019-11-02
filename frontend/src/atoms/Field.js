import React from 'react';
import {useField} from 'formik';

import {Form} from "react-bootstrap";

export function Field({label, message, ...props}) {
    const [field] = useField(props);

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control {...field} {...props}/>
            <Form.Control.Feedback type="invalid">
                {message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}