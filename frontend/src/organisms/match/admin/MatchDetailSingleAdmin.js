import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {useGetAvailablePlayers} from "../../../api/teamMembershipClient_v1";
import {MatchDetailTeamTabAdmin} from "./MatchDetailTeamTabAdmin";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function MatchDetailSingleAdmin({id_match, data}) {
    const [stateAvailablePlayers, fetchAvailablePlayers] = useGetAvailablePlayers(data.id_host, id_match);

    return (
            <div>
                <Row className="match-score">
                    <Col lg={5} md={12} sm={12} xs={12} className=" align-self-center team-home">
                        <div className="text-center mt-2">Domácí:</div>
                        <h2>{data.host_name}</h2>
                    </Col>
                    <Col lg={1} md={12} sm={12} xs={12} className="align-self-center score">
                        <span className="home">{data.guest_name}</span>
                    </Col>
                </Row>

                <Tabs className="mb-3 adminMatchTabs" fill defaultActiveKey="host" id="teamTabs">
                    <Tab eventKey="host" title={<span><b>Domácí: </b> {data.host_name}</span>}>
                        <MatchDetailTeamTabAdmin id_team={data.id_host} id_match={id_match} host={1}
                                                 availablePlayers={stateAvailablePlayers} fetchAvailablePlayers={fetchAvailablePlayers}
                        />

                    </Tab>
                    <Tab eventKey="guest" title={<span><b>Hosté: </b> {data.guest_name}</span>}>
                        <MatchDetailTeamTabAdmin id_team={data.id_guest} id_match={id_match} host={0}
                                                 availablePlayers={stateAvailablePlayers} fetchAvailablePlayers={fetchAvailablePlayers}
                        />
                    </Tab>
                </Tabs>
            </div>
    );
}
