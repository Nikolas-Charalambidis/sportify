import React from 'react';
import { Form } from "react-bootstrap";

import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import cs from 'date-fns/locale/cs';

registerLocale('cs', cs);

export function DatePickerField({ label, date, name, setFieldValue, message, isInvalid }) {

    const errorMessage = {
        fontSize: '80%',
        color: "#dc3545",
    };

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label><br/>
            <DatePicker
                autoComplete="off"
                locale="cs"
                selected={date}
                dateFormat="dd.MM.yyyy"
                className="form-control"
                name={name}
                onChange={date => setFieldValue(name, date)}
            />
            {isInvalid &&
                <div style={errorMessage}>
                    {message}
                </div>
            }
            
        </Form.Group>
    );
}