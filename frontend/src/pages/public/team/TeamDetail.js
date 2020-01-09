import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {Heading} from '../../../basicComponents';
import {Image, Tabs, Tab, Row, Button, Col} from 'react-bootstrap';
import {TeamSquad} from "../../../organisms/team/public/TeamSquad";
import {useGetTeam, useGetTeamMatches} from "../../../api/teamClient_v1";
import {TeamCompetitions} from "../../../organisms/team/public/TeamCompetitions";
import {TeamStatistics} from "../../../organisms/team/public/TeamStatistics";
import loadingGif from "../../../assets/images/loading.gif";
import {TeamData} from "../../../organisms/team/public/TeamData";
import {MatchList} from "../../../organisms/match/MatchList";
import {useGetTeamPlayers, useGetTeamPlayersByStatus} from "../../../api/teamMembershipClient_v1";
import {useAuth} from "../../../utils/auth";
import {TeamRequestModal} from "../../../basicComponents/TeamRequestModal";
import {useGetTeamPositions} from "../../../api/othersClient_v1";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";
import {TeamDetailBreadcrumbs} from "../../../organisms/breadcrumbs/TeamDetailBreadcrumbs";

export function TeamDetail() {
    const {user} = useAuth();
    let {id_team} = useParams();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state] = useGetTeam(id_team);
    const [matchesState] = useGetTeamMatches(id_team);
    const [playersState] = useGetTeamPlayersByStatus(id_team, "active");
    const [allTeamPlayers] = useGetTeamPlayers(id_team);
    const [positions] = useGetTeamPositions();
    const [positionsState, setPositionsState] = useState({id_position: null});

    if(state.isLoading) {
        return <div className="text-center"><Image src={loadingGif}/></div>;
    }

    if(!state.isLoading && state.error) {
        return (
            <div>
                <TeamDetailBreadcrumbs teamName={state.team_data.name} />
                <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>
            </div>
        );
    }

    return (
        <div>
            {(!state.isLoading && !state.error) ?
            <div>
                <TeamDetailBreadcrumbs teamName={state.team_data.name} />
                <Heading className="mt-4 mb-5">{state.team_data.name}</Heading>

                <TeamData state={state} />
                {user ? (<Row>
                    <Col className="mb-4 mt-lg-0" lg={{span: 5, offset: 4}} md={{span: 8, offset: 2}} sm={{span: 10, offset: 1}} xs={{span: 11, offset: 1}}>
                        <Button variant="primary" onClick={ () => {
                            const [membership] = allTeamPlayers.players.filter((objectsInArray) => {
                                    (objectsInArray.id_user === user.id_user && objectsInArray.status === "active")
                                    && window.flash("Již jste zařazen na jako aktivní hráč na soupisce tohoto týmu", "info");
                                    (objectsInArray.id_user === user.id_user && objectsInArray.status === "inactive")
                                    && window.flash("Již jste zařazen na jako neaktivní hráč na soupisce tohoto týmu", "info");
                                    (objectsInArray.id_user === user.id_user && objectsInArray.status === "pending")
                                    && window.flash("Vaše žádost o členství v tomto týmu čeká na vyřizení", "info");
                                    (objectsInArray.id_user === user.id_user && objectsInArray.status === "declined")
                                    && window.flash("Vaše žádost o členství v tomto týmu byla zamítnuta", "info");
                                    return (objectsInArray.id_user === user.id_user);
                                }
                            );
                            (membership === undefined) && handleShow();
                        }}>
                            Odeslat žádost o zařazení do týmu
                        </Button>

                        <TeamRequestModal show={show} handleClose={handleClose} positions={positions.positions} positionsState={positionsState}
                                          setPositionsState={setPositionsState} id_user={user.id_user} id_team={id_team}/>
                    </Col>
                </Row>) : null }

                <Tabs className="mb-3" fill defaultActiveKey="squad" id="teamTabs">
                    <Tab eventKey="squad" title="Sestava">
                        <TeamSquad status="active" playersState={playersState}/>
                    </Tab>
                    <Tab eventKey="competition" title="Soutěže">
                        <TeamCompetitions admin={false}/>
                    </Tab>
                    <Tab eventKey="statistics" title="Statistiky">
                        <TeamStatistics/>
                    </Tab>
                    <Tab eventKey="matches" title="Zápasy">
                        <MatchList matchesState={matchesState} admin={false} id_team={id_team} />
                    </Tab>
                </Tabs>
            </div>
            : <UnexpectedError/>
            }
        </div>
    );
}
