import React from 'react';
import {NavLink as Link, useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import {Heading} from '../../../atoms';
import {Breadcrumb, Row, Col, Image, Tabs, Tab} from 'react-bootstrap';
import {TeamSquad} from "./components/TeamSquad";
import {useGetTeam} from "../../../api/team/teamClient_v1";
import defaultTeamAvatar from '../../../assets/images/default_team_avatar.jpg';
import { mapSportToIcon } from '../../../utils/mapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function TeamDetail() {
    let {id_team} = useParams();
    const [state] = useGetTeam(id_team);

    return (
        <div>
            {state.isLoading && <div>Načítám data...</div>}
            {(!state.isLoading && state.error) && <div>Data se nepodařilo načíst</div>}
            {!state.isLoading &&
            <div>
                <Breadcrumb>
                    <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                    <li className="breadcrumb-item"><Link to="/teams">Týmy</Link></li>
                    <li className="breadcrumb-item"><span className="active">{state.team_data.name}</span></li>
                </Breadcrumb>
                <Heading className="mt-4 mb-5">{state.team_data.name}</Heading>

                <Row className="mb-5">
                    <Col lg={3} md={12} className="mb-4 mb-lg-0">
                        <div className="avatar-upload">
                            <div className="avatar-preview">
                                <div id="imagePreview">
                                    {state.team_data.avatar
                                        ? <Image roundedCircle src={defaultTeamAvatar} fluid/>
                                        : <Image roundedCircle src={state.team_data.avatar} fluid/>
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>


                    <Col lg={8} md={12}>
                        <Row className="teamDetailDesc">
                            <Col md={4} sm={4} xs={6}>
                                <p>Vedoucí týmu</p>
                                <Heading size="xs">{state.team_data.leader}</Heading>
                            </Col>
                            <Col md={4} sm={4} xs={6}>
                                <p>Typ týmu</p>
                                <Heading size="xs">{state.team_data.type}</Heading>
                            </Col>
                            <Col md={4} sm={4} xs={6}>
                                <p>Sport</p>
                                <Heading size="xs"><FontAwesomeIcon icon={mapSportToIcon(state.team_data.id_sport)} className="mr-2" size="1x" /> {state.team_data.sport}</Heading>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Tabs className="mb-3" fill defaultActiveKey="squad" id="teamTabs">
                    <Tab eventKey="squad" title="Sestava">
                        <TeamSquad teamId={1}/>
                    </Tab>
                    <Tab eventKey="competition" title="Soutěže">
                    </Tab>
                    <Tab eventKey="statistics" title="Statistiky">
                    </Tab>
                </Tabs>
            </div>
            }
        </div>
    );
}
