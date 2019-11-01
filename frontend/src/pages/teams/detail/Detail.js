import React from 'react'

import {registerLocale} from "react-datepicker"
import cs from 'date-fns/locale/cs'

import "react-datepicker/dist/react-datepicker.css"

import {Heading} from '../../../atoms'
import {Breadcrumb, Row, Col, Image, Tabs, Tab} from 'react-bootstrap'
import {CardTemplate} from '../../../templates/CardTemplate'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import {TeamSquad} from "./components/TeamSquad"

//import DatePicker from "react-datepicker";
//import * as yup from 'yup';

registerLocale('cs', cs)

export function Detail() {

    //const schema = yup.object().shape({
    //    type: yup.string(),
    //    date: yup.string(),
    //});

    //const datepickerfield = ({ name, value, onchange }) => {
    //    return (
    //        <datepicker
    //            locale="cs"
    //            selected={(value && new date(value)) || null}
    //            onchange={val => {
    //                onchange(name, val);
    //            }}
    //        />
    //    );
    //};

    // temporary CSS styles

    const subTitleContainer = {
        width: '100%',
    }

    const subTitleLeftLabel = {
        width: '15%',
        color: '#969696',
    }

    const subTitleRightLabel = {
        fontWeight: '600',
    }

    //const form = {
    //    display: 'flex',
    //    justifyContent: 'space-between',
    //    border: '1px solid',
    //};

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item href="/teams">Týmy</Breadcrumb.Item>
                <Breadcrumb.Item active>Název týmu</Breadcrumb.Item>
            </Breadcrumb>
            <Heading className="pageHeading mt-4 mb-5">Tým 8</Heading>

            <Row>
                <Col xl={10} lg={12}>
                    <Row>
                        <div style={subTitleContainer}>
                            <label style={subTitleLeftLabel}>Vedoucí týmu:</label>
                            <label style={subTitleRightLabel}>Jméno</label>
                        </div>
                    </Row>
                    <Row>
                        <div style={subTitleContainer}>
                            <label style={subTitleLeftLabel}>Sport:</label>
                            <label style={subTitleRightLabel}>Hokej</label>
                        </div>
                    </Row>
                    <Row>
                        <div style={subTitleContainer}>
                            <label style={subTitleLeftLabel}>Výhry/Prohry:</label>
                            <label style={subTitleRightLabel}>2/0</label>
                        </div>
                    </Row>
                </Col>
                <Col className="d-none d-xl-block">
                    <Image roundedCircle
                           src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfe80083d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfe80083d%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"/>
                </Col>
            </Row>


            <Tabs fill defaultActiveKey="squad" id="teamTabs">
                <Tab eventKey="squad" title="Sestava">
                    <TeamSquad/>
                </Tab>
                <Tab eventKey="competition" title="Soutěže">
                </Tab>
                <Tab eventKey="statistics" title="Statistiky">
                </Tab>
            </Tabs>

            {/*<Formik
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
                </Formik> */}
            <h2 className="mt-4">Soupiska hráčů</h2>
            <Row>
                <CardTemplate nazev="Tony Stark" podnazev="Útočník" icon={Icons.faFutbol} sport="fotbal"
                              logo="https://bit.ly/2PCKpYD"
                              bodyAsistence="11/4" trest="6/4"/>
                <CardTemplate nazev="Captain America" podnazev="Útočník" icon={Icons.faFutbol} sport="fotbal"
                              logo="https://bit.ly/320mLrB"
                              bodyAsistence="7/3" trest="0/1"/>
                <CardTemplate nazev="Thor" podnazev="Obránce" icon={Icons.faFutbol} sport="fotbal"
                              logo="https://bit.ly/2WucRx8"
                              bodyAsistence="3/1" trest="0/0"/>
                <CardTemplate nazev="Starlord" podnazev="Obránce" icon={Icons.faHockeyPuck} sport="hokej"
                              logo="https://bit.ly/322b4Rh"
                              bodyAsistence="6/2" trest="1/2"/>
                <CardTemplate nazev="Bruce Banner" podnazev="Brankář" icon={Icons.faFutbol} sport="fotbal"
                              logo="https://bit.ly/2C0BacG"
                              bodyAsistence="1/0" trest="0/4"/>
            </Row>

            <h2 className="mt-4">Přehled zápasů</h2>
            <Row>
                <CardTemplate nazev="Protivník 1" podnazev="Amatérský zápas" icon={Icons.faFutbol} sport="fotbal"
                              logo="http://bit.ly/32Z7Hfl" datum="10.08.2019" vysledekZapasu="5:4"/>
                <CardTemplate nazev="Protivník 2" podnazev="Soutěž" icon={Icons.faFutbol} sport="fotbal"
                              logo="http://bit.ly/2PrDmSC" datum="23.09.2019" vysledekZapasu="2:0"/>
            </Row>
        </div>
    )
}
