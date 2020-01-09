import React from "react";
import { NavLink as Link, useParams } from 'react-router-dom';
import { Heading } from '../../../basicComponents';
import { Field } from "../../../basicComponents";
import { DatePickerField } from "../../../basicComponents/DatePickerField"
import { CustomSelect } from "../../../basicComponents/Select";
import { Breadcrumb, Form, Button } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { useGetCompetitionDetail } from "../../../api/competitionClient_v1";
import { useGetSports } from "../../../api/othersClient_v1";
import { editCompetition } from "../../../api/competitionClient_v1";
import { useApi } from "../../../hooks/useApi";
import { useAuth } from '../../../utils/auth';
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";

function getSport(competition, sports) {
    if (competition && sports) {
        const competitionSport = competition.sport;
        const sport = sports.find(s => s.sport === competitionSport);
        return sport;
    }
};

function getCompetitionType(competition, competitionType) {
    if (competition) {
        //todo, waiting for BE
    }
};

function canEdit(competition, user, history) {
    if (competition && user) {
        if (competition.id_leader === user.id_user) {
            return true;
        } else {
            history.replace(`/`);
            return false;
        }
    }

};

export function CompetitionEdit() {
    let { id_competition } = useParams();
    const [competitionState] = useGetCompetitionDetail(id_competition);
    const competition = competitionState.competition_data;

    const { user } = useAuth();

    const [sportsState] = useGetSports();
    const sports = sportsState.sports;
    const competitionSport = getSport(competition, sports);

    getCompetitionType(competition);

    const api = useApi();
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
            {sportsState.isLoading && competitionState.isLoading && <div> Načítám data...</div>}
            {((!sportsState.isLoading && sportsState.error) || (!competitionState.isLoading && competitionState.error)) && <div>Data se nepodařilo načíst</div>}
            {(!sportsState.isLoading && !sportsState.error) && (!competitionState.isLoading && !competitionState.error) &&
                <div>
                    {canEdit(competition, user, history) &&
                        <div>
                            <Breadcrumb>
                                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                                <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
                                <li className="breadcrumb-item"><Link to="/competitions">Soutěže</Link></li>
                                <li className="breadcrumb-item"><span className="active">Nová soutěž</span></li>
                            </Breadcrumb>
                            <Heading>{competition.name}</Heading>

                            <Formik
                                validationSchema={schemaCreateTeam}
                                initialValues={{
                                    name: competition.name,
                                    city: competition.city,
                                    startDate: new Date(competition.start_date),
                                    endDate: new Date(competition.end_date),
                                    id_sport: competitionSport.id_sport,
                                    id_type: competitionType[0].id_type,
                                }}
                                onSubmit={values => {
                                    editCompetition(competition.id_competition, values.name, user.id_user, values.city, api, history);
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
                                                    placeholder={competitionSport.sport}
                                                    onChange={option => setFieldValue("id_sport", `${option.id_sport}`)}
                                                    isSearchable={true}
                                                    isDisabled={true}
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
                                                <DatePickerField label="Zahájení soutěže" name="startDate" date={values.startDate} setFieldValue={setFieldValue} message="Vyplňte prosím datum zahájení" isInvalid={errors.startDate} disabled={true} />
                                            </Col>
                                            <Col md={3} sm={3} xs={3} className="mt-sm-0 mt-3">
                                                <DatePickerField label="Konec soutěže" name="endDate" date={values.endDate} setFieldValue={setFieldValue} message="Vyplňte prosím datum konce" isInvalid={errors.endDate} disabled={true} />

                                            </Col>
                                        </Row>

                                    </div>
                                    <Button variant="danger" onClick={() => console.log("dodělat, chybí endpoint")}>Smazat</Button>
                                    <Button variant="primary" type="submit">Uložit</Button>

                                </Form>
                            )}
                            </Formik>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
