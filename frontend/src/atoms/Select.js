import React from 'react';
import {useField} from 'formik';

import {Form} from "react-bootstrap";

const renderOptions = (options, mapping, defaultID) => {
    const {key, value} = mapping;
    return options.map((item, index) => {
        if(item[key] === defaultID){
            return <option key={index} value={item[key]} >{item[value]}</option>;
        } else {
            return <option key={index} value={item[key]} selected>{item[value]}</option>;
        }
    });
};

export function Select({label, message, options, defaultID, mapping, ...props}) {
    const [field] = useField(props);
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control {...field} {...props} as='select'>
                {renderOptions(options, mapping, defaultID)}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
                {message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}