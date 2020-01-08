import React from "react";
import { NavLink as Link } from 'react-router-dom';
import { Heading } from '../../../basicComponents';
import { Field } from "../../../basicComponents";
import { DatePickerField } from "../../../basicComponents/DatePickerField"
import { CustomSelect } from "../../../basicComponents/Select";
import { Breadcrumb, Form, Button } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { useGetSports } from "../../../api/othersClient_v1";
import { createCompetition } from "../../../api/competitionClient_v1";
import { useApi } from "../../../hooks/useApi";
import { useAuth } from '../../../utils/auth';
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";

export function CompetitionCreate() {
    const api = useApi();
    const { user } = useAuth();
    const [sportsState] = useGetSports();
    const sports = sportsState.sports;
    let history = useHistory();

    const schemaCreateTeam = yup.object().shape({
        name: yup.string().required(),
        city: yup.string().required(),
        startDate: yup.string().required(),
        endDate: yup.string().required(),
    });

    const competitionType = [
        { id_type: 0, type: "Amatéři" },
        { id_type: 1, type: "Liga" },
    ];

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><Link to="/competitions">Soutěže</Link></li>
                <li className="breadcrumb-item"><span className="active">Nová soutěž</span></li>
            </Breadcrumb>
            <Heading>Nová soutěž</Heading>
            {sportsState.isLoading && <div>Načítám data...</div>}
            {(!sportsState.isLoading && sportsState.error) && <div>Data se nepodařilo načíst</div>}
            {(!sportsState.isLoading && !sportsState.error) &&
                <Formik
                    validationSchema={schemaCreateTeam}
                    initialValues={{
                        name: '',
                        city: '',
                        startDate: '',
                        endDate: '',
                        id_sport: sports[0].id_sport,
                        id_type: competitionType[0].id_type,
                    }}
                    onSubmit={values => {
                        createCompetition(values.name, user.id_user, values.id_sport, values.id_type, values.city, values.startDate, values.endDate, api, history);
                    }}
                >{({ handleSubmit, setFieldValue, values, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div>
                            <Row>
                                <Col md={6} sm={6} xs={6} className="mt-sm-0 mt-3">
                                    <Field label="Název soutěže" name="name" type="text" message="Vyplňte prosím název soutěže" isInvalid={!!errors.name} />
                                </Col>

                                <Col md={6} sm={6} xs={6} className="mt-sm-0 mt-3">
                                    <Field label="Město" name="city" type="text" message="Vyplňte prosím město" isInvalid={!!errors.name} />     
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6} sm={6} xs={6} className="mt-sm-0 mt-3">
                                    <CustomSelect label="Sport" name="id_sport"
                                        options={sports}
                                        getOptionLabel={option => `${option.sport}`}
                                        getOptionValue={option => `${option.id_sport}`}
                                        placeholder={sports[0].sport}
                                        onChange={option => setFieldValue("id_sport", `${option.id_sport}`)}
                                        isSearchable={true}
                                    />
                                </Col>

                                <Col md={6} sm={6} xs={6} className="mt-sm-0 mt-3">
                                    <CustomSelect label="Typ soutěže" name="id_type"
                                        options={competitionType}
                                        getOptionLabel={option => `${option.type}`}
                                        getOptionValue={option => `${option.id_type}`}
                                        placeholder={competitionType[0].type}
                                        onChange={option => setFieldValue("id_type", `${option.id_type}`)}
                                        isSearchable={true}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col md={3} sm={3} xs={3} className="mt-sm-0 mt-3">
                                    <DatePickerField label="Zahájení soutěže" name="startDate" date={values.startDate} setFieldValue={setFieldValue} message="Vyplňte prosím datum zahájení" isInvalid={errors.startDate}/>                                    
                                </Col>
                                <Col md={3} sm={3} xs={3} className="mt-sm-0 mt-3">
                                    <DatePickerField label="Konec soutěže" name="endDate" date={values.endDate} setFieldValue={setFieldValue} message="Vyplňte prosím datum konce" isInvalid={errors.endDate} />

                                </Col>
                            </Row>                           

                        </div>
                        <Button variant="primary" type="submit">Vytvořit soutěž</Button>
                    </Form>
                )}
                </Formik>
            }
        </div>
    )
}
