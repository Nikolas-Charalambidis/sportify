import React from 'react';
import {NavLink as Link, useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import {Heading} from '../../../atoms';
import {Breadcrumb, Image} from 'react-bootstrap';
import loadingGif from "../../../assets/images/loading.gif";
import {useGetMatch} from "../../../api/matches/matchClient_v1";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import {GoalEvents} from "./components/GoalEvents";
import {MatchSquad} from "./components/MatchSquad";
import {SuspensionsEvents} from "./components/SuspensionsEvents";
import Container from "react-bootstrap/Container";

export function MatchDetail() {
    let {id_team, id_match} = useParams();
    const [stateMatch] = useGetMatch(id_match);

    return (
        <div>
            {stateMatch.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!stateMatch.isLoading && stateMatch.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!stateMatch.isLoading && !stateMatch.error) &&
            <div>
                <Breadcrumb>
                    <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                    <li className="breadcrumb-item"><Link to="/teams">Týmy</Link></li>
                    <li className="breadcrumb-item"><Link to={'/teams/' + id_team}>Detail týmu</Link></li>
                    <li className="breadcrumb-item"><span className="active">Detail zápasu</span></li>
                </Breadcrumb>

                <div className="container page match">
                    <Row>
                        <Col className="col-100 heading">
                            <Heading size="lg">
                                <ul>
                                    <li>{stateMatch.match.competition_name ? stateMatch.match.competition_name : "Amatérský zápas "}</li>
                                    <li>|{moment(stateMatch.match.date).local().format("DD. MM. YYYY HH:mm")}</li>
                                </ul>
                            </Heading>
                        </Col>
                    </Row>

                    <Row className="match-score">
                        <Col lg={5} md={12} sm={12} xs={12} className=" align-self-center team-home">
                            <div className="text-center mt-2">Domácí:</div>
                            <h2>{stateMatch.match.host_name}</h2>
                        </Col>
                        <Col lg={1} md={12} sm={12} xs={12} className="mb-lg-0 mb-3 score align-self-center">
                            <span className="home">{stateMatch.match.goals_host}</span>
                        </Col>
                        <Col lg={1} md={12} sm={12} xs={12} className="align-self-center score">
                            <span className="home">{stateMatch.match.goals_guest}</span>
                        </Col>
                        <Col lg={5} md={12} sm={12} xs={12} className="align-self-center team-visiting">
                            <div className="text-center mt-2">Hosté:</div>
                            <h2>{stateMatch.match.guest_name}</h2>
                        </Col>
                    </Row>

                    <Heading size="lg" className="mt-5 h3MatchDetail text-left">Soupiska</Heading>
                    <div className="eventsDiv">
                        <Container>
                            <Row>
                                <Col>
                                    <Heading size="sm" className="d-lg-none mt-3">Domácí</Heading>
                                    <MatchSquad id_match={id_match} host={1}/>
                                </Col>
                                <Col>
                                    <Heading size="sm" className="d-lg-none mt-3">Hosté</Heading>
                                    <MatchSquad id_match={id_match} host={0}/>
                                </Col>
                            </Row>
                        </Container>
                    </div>


                    <Heading size="lg" className="mt-5 h3MatchDetail text-left">Zápis z utkání</Heading>
                    <div className="eventsDiv">
                        <Heading size="sm" className="mt-4">1. třetina</Heading>
                        <GoalEvents id_match={id_match} period={1}/>
                        <SuspensionsEvents id_match={id_match} period={1}/>

                        <Heading size="sm" className="mt-4">2. třetina</Heading>
                        <GoalEvents id_match={id_match} period={2}/>
                        <SuspensionsEvents id_match={id_match} period={2}/>

                        <Heading size="sm" className="mt-4">3. třetina</Heading>
                        <GoalEvents id_match={id_match} period={3}/>
                        <SuspensionsEvents id_match={id_match} period={3}/>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
