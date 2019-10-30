import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Heading, MainSection } from '../atoms';
import { TopNavigation } from '../organisms/TopNavigation';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Footer } from '../organisms/Footer';

export function TeamDetail() {

    const schema = yup.object().shape({
        type: yup.string(),
        date: yup.string(),
    });

    const DatePickerField = ({ name, value, onChange }) => {
        return (
            <DatePicker
                selected={(value && new Date(value)) || null}
                onChange={val => {
                    onChange(name, val);
                }}
            />
        );
    };

    // temporary CSS styles
    const subTitle = {
        display: 'flex',
        justifyContent: 'space-between'
    };

    return (
        <div>          
            <TopNavigation />
            <MainSection>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                    <Breadcrumb.Item href="/teams">Týmy</Breadcrumb.Item>
                    <Breadcrumb.Item active>Název týmu</Breadcrumb.Item>
                </Breadcrumb>
                <Heading>Název týmu</Heading>
                <div style={subTitle} >
                    <Heading size="md">Sport: název</Heading>
                    <Heading size="md">Vedoucí týmu: jméno</Heading>
                </div>                

                <Formik
                    initialValues={{ type: '1', date: '' }}
                    validationSchema={schema}
                    onSubmit={values => {
                        const { type, date } = values;
                        console.log(type);
                        console.log(date);
                    }}
                >
                    {props => {
                        const { values, setFieldValue } = props;
                        return (
                            <Form className="mt3">

                                <Field as="select" name="type">
                                    <option value="1">Nevybráno</option>
                                    <option value="2">Soutěže</option>
                                    <option value="3">Zápasy</option>
                                </Field>

                                <DatePickerField name="date" value={values.date} onChange={setFieldValue} />
                                <Button variant="secondary" type="submit">Hledat</Button>
                                <Button variant="secondary" onClick={props.handleReset}>Reset</Button>
                            </Form>
                        );
                    }}
                </Formik>

          </MainSection>
        <Footer />
    </div>
  );
}
