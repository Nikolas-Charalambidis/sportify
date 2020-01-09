import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CustomSelect } from '../../../../basicComponents/Select';

const schema = yup.object().shape({
    id_team_home: yup.string().required(),
    id_team_visiting: yup.number().required(),
});

export function MatchTeamSelect({teams, setHostState, setGuestState}) {

    return (
        <Formik
            validationSchema={schema}
            onSubmit={values =>  () => {}}
        >{() => (
            <Form noValidate>
                <Row>
                    <Col sm={{ span: 6, offset: 0 }}>
                        <CustomSelect
                            label="Domácí"
                            name="id_team_home"
                            options={teams}
                            getOptionLabel={option => `${option.name}`}
                            getOptionValue={option => `${option.id_team}`}
                            placeholder="Vyberte tým domácích"
                            onChange={option => {
                                setHostState({
                                    id_team: option.id_team,
                                    matchups: [],
                                    events: [],
                                    shots: 0
                                });
                            }}
                            isSearchable={true}
                        />
                    </Col>
                    <Col sm={{ span: 6, offset: 0 }}>
                        <CustomSelect
                            label="Hosté"
                            name="id_team_visiting"
                            options={teams}
                            getOptionLabel={option => `${option.name}`}
                            getOptionValue={option => `${option.id_team}`}
                            placeholder="Vyberte tým hostů"
                            onChange={option => {
                                setGuestState({
                                    id_team: option.id_team,
                                    matchups: [],
                                    events: [],
                                    shots: 0
                                });
                            }}
                            isSearchable={true}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ span: 12, offset: 0 }}>

                    </Col>
                </Row>
            </Form>
        )}
        </Formik>


    );
}
