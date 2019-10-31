import React from 'react';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import cs from 'date-fns/locale/cs';

import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Heading, MainSection } from '../atoms';
import { TopNavigation } from '../organisms/TopNavigation';
import { Breadcrumb, Button, Col, Row } from 'react-bootstrap';
import { Footer } from '../organisms/Footer';
import { CardTemplate } from '../templates/CardTemplate';
import * as Icons from '@fortawesome/free-solid-svg-icons';

registerLocale('cs', cs);

export function TeamDetail() {

    const schema = yup.object().shape({
        type: yup.string(),
        date: yup.string(),
    });

    const DatePickerField = ({ name, value, onChange }) => {
        return (
            <DatePicker
                locale="cs"
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
        justifyContent: 'space-between',
    };

    const form = {
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid',
    };

    return (
        <div>          
            <TopNavigation/>
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
                                <div style={form}>
                                    <div>
                                        <Field as="select" name="type">
                                            <option value="1">Nevybráno</option>
                                            <option value="2">Soutěže</option>
                                            <option value="3">Zápasy</option>
                                        </Field>
                                        <DatePickerField name="date" value={values.date} onChange={setFieldValue} />
                                    </div>
                                    <div>
                                        <Button variant="secondary" type="submit">Hledat</Button>
                                        <Button variant="secondary" onClick={props.handleReset}>Reset</Button>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>

                <h2 className="mt-4">Soupiska hráčů</h2>
                <Row>
                    <CardTemplate nazev="Tony Stark" icon={Icons.faFutbol} sport="fotbal" logo="https://bit.ly/2PCKpYD" />
                    <CardTemplate nazev="Captain America" icon={Icons.faFutbol} sport="fotbal" logo="https://bit.ly/320mLrB" />
                    <CardTemplate nazev="Thor" icon={Icons.faFutbol} sport="fotbal" logo="https://bit.ly/2WucRx8" />
                    <CardTemplate nazev="Starlord" icon={Icons.faHockeyPuck} sport="hokej" logo="https://bit.ly/322b4Rh" />
                    <CardTemplate nazev="Bruce Banner" icon={Icons.faFutbol} sport="fotbal" logo="https://bit.ly/2C0BacG" />
                </Row>

                <h2 className="mt-4">Přehled zápasů</h2>
                <Row>
                    <CardTemplate nazev="Protivník 1" pozice="Amatérský zápas" icon={Icons.faFutbol} sport="fotbal"
                        logo="http://bit.ly/32Z7Hfl" stav="Probíhá" />
                    <CardTemplate nazev="Protivník 2" pozice="Soutěž" icon={Icons.faFutbol} sport="fotbal"
                        logo="http://bit.ly/2PrDmSC" stav="Ukončen" />
                </Row>

          </MainSection>
        <Footer />
    </div>
  );
}
