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
                    <li className="breadcrumb-item"><span className="active">Zápas</span></li>
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
                        <Col lg={5} className=" align-self-center team-home">
                            <div className="text-center mt-2">Domácí:</div>
                            <h2>{stateMatch.match.host_name}</h2>
                        </Col>
                        <Col lg={1} className="score align-self-center">
                            <span className="home">4</span>
                        </Col>
                        <Col lg={1} className="align-self-center score">
                            <span className="home">4</span>
                        </Col>
                        <Col lg={5} className="align-self-center team-visiting">
                            <div className="text-center mt-2">Hosté:</div>
                            <h2>{stateMatch.match.guest_name}</h2>
                        </Col>
                    </Row>
                </div>
            </div>
            }
        </div>
    );
}
