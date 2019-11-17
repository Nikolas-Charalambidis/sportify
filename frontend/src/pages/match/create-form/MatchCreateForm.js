import React, { useState } from 'react';
import {Heading} from '../../../atoms/';
import { Breadcrumb } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useGetTeams } from "../../../api/team/teamClient_v1";
import { CustomSelect } from "../../../atoms/Select";
import { PlayerSelectModal } from "./components/PlayerSelectModal";

let selectedPlayers = [];

function getTeam(state) {
    return state.teams_data;
};

const schema = yup.object().shape({
    id_team_home: yup.string().required(),
    id_team_visiting: yup.number().required(),
});

export function MatchCreateForm() {
    const [state] = useGetTeams();
    const teams = getTeam(state);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onSelectedPlayers(players) {
        //data z modalu
        setShow(false);
        selectedPlayers = players;
        console.log(selectedPlayers);
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Nový zápas</Breadcrumb.Item>
            </Breadcrumb>

            {state.isLoading && <div>Načítám data...</div>}
            {(!state.isLoading && state.error) && <div>Data se nepodařilo načíst</div>}
            {(!state.isLoading && !state.error) &&
                <Formik
                    initialValues={{
                        id_team_home: teams.id_team,
                        id_team_visiting: teams.id_team,
                    }}
                    validationSchema={schema}
                    onSubmit={values => {
                        console.log("submit", values);
                        console.log("players", selectedPlayers);
                    }}
                >{({ handleSubmit, setFieldValue, values, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Heading className="pageHeading mt-4 mb-5">Nový zápas</Heading>
                        <Row>
                            <Col xl={10} lg={10}>
                                <Row>
                                    <Col sm={{ span: 6, offset: 0 }}>
                                        <CustomSelect label="Domácí" name="id_team_home"
                                            options={teams}
                                            getOptionLabel={option => `${option.name}`}
                                            getOptionValue={option => `${option.id_team}`}
                                            placeholder="Vyberte tým"
                                            onChange={option => setFieldValue("id_team_home", `${option.id_team}`)}
                                            isSearchable={true}
                                        />
                                    </Col>
                                    <Col sm={{ span: 6, offset: 0 }}>
                                        <CustomSelect label="Hosté" name="id_team_visiting"
                                            options={teams}
                                            getOptionLabel={option => `${option.name}`}
                                            getOptionValue={option => `${option.id_team}`}
                                            placeholder="Vyberte tým"
                                            onChange={option => setFieldValue("id_team_visiting", `${option.id_team}`)}
                                            isSearchable={true}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-4 mt-lg-0" lg={{ span: 5, offset: 0 }}>
                                <Button type="submit" variant="secondary" block onClick={handleShow}>
                                    Soupiska domácích
							</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-4 mt-lg-0" lg={{ span: 5, offset: 0 }}>
                                <Button type="submit" block>
                                    Uložit
							</Button>
                            </Col>
                        </Row>
                        <PlayerSelectModal show={show} handleClose={handleClose} id_team={values.id_team_home} handleClosePlayers={onSelectedPlayers} />
                    </Form>
                )}
                </Formik>
            }            
        </div>
    );
}
