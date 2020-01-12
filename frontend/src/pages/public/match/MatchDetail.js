import React from 'react';
import {useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {Heading} from '../../../basicComponents';
import {useGetMatch} from "../../../api/matchClient_v1";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import {MatchDetailGoalEvents} from "../../../organisms/match/public/MatchDetailGoalEvents";
import {MatchDetailMatchSquad} from "../../../organisms/match/public/MatchDetailMatchSquad";
import {MatchDetailSuspensionsEvents} from "../../../organisms/match/public/MatchDetailSuspensionsEvents";
import Container from "react-bootstrap/Container";
import {MatchDetailScore} from "../../../organisms/match/public/MatchDetailScore";
import {MatchDetailBreadcrumbs} from "../../../organisms/breadcrumbs/MatchDetailBreadcrumbs";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";

export function MatchDetail() {
    let {id_team, id_match} = useParams();
    const [stateMatch] = useGetMatch(id_match);

    const header = (
        <div>
            <MatchDetailBreadcrumbs idTeam={id_team} />
        </div>
    );

    if(stateMatch.isLoading) {
        return <LoadingGif header={header}/>;
    }

    if(!stateMatch.isLoading && stateMatch.error) {
        return <DataLoadingError header={header}/>;
    }

    return (
        <div>
            {(!stateMatch.isLoading && !stateMatch.error) ?
                <div>
                    {header}
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

                        <MatchDetailScore guestGoals={stateMatch.match.goals_guest} guestName={stateMatch.match.guest_name}
                                          hostName={stateMatch.match.host_name} hostGoals={stateMatch.match.goals_host}/>

                        <Heading size="lg" className="mt-5 h3MatchDetail text-left">Soupiska</Heading>
                        <div className="eventsDiv">
                            <Container>
                                <Row>
                                    <Col>
                                        <Heading size="sm" className="d-lg-none mt-3">Domácí</Heading>
                                        <MatchDetailMatchSquad id_match={id_match} host={1}/>
                                    </Col>
                                    <Col>
                                        <Heading size="sm" className="d-lg-none mt-3">Hosté</Heading>
                                        <MatchDetailMatchSquad id_match={id_match} host={0}/>
                                    </Col>
                                </Row>
                            </Container>
                        </div>


                        <Heading size="lg" className="mt-5 h3MatchDetail text-left">Zápis z utkání</Heading>
                        <div className="eventsDiv">
                            <Heading size="sm" className="mt-4">1. třetina</Heading>
                            <MatchDetailGoalEvents id_match={id_match} period={1}/>
                            <MatchDetailSuspensionsEvents id_match={id_match} period={1}/>

                            <Heading size="sm" className="mt-4">2. třetina</Heading>
                            <MatchDetailGoalEvents id_match={id_match} period={2}/>
                            <MatchDetailSuspensionsEvents id_match={id_match} period={2}/>

                            <Heading size="sm" className="mt-4">3. třetina</Heading>
                            <MatchDetailGoalEvents id_match={id_match} period={3}/>
                            <MatchDetailSuspensionsEvents id_match={id_match} period={3}/>
                        </div>
                    </div>
                </div>
                : <UnexpectedError/>
            }
        </div>
    );
}
