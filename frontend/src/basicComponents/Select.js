import React from 'react';
import {Form} from "react-bootstrap";
import {CustomTooltip} from "./CustomTooltip";
import Select from 'react-select';

export function CustomSelect({label, customTooltip, ...props}) {
    return (
        <Form.Group>
            <Form.Label>{label}&nbsp;&nbsp;</Form.Label>
            {customTooltip && CustomTooltip(customTooltip)}
            <Select {...props} isClearable={true}/>
            <Form.Control.Feedback type="invalid">
                {"Chyba"}
            </Form.Control.Feedback>
        </Form.Group>
    );
}
