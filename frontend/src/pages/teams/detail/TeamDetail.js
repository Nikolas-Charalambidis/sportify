import React from 'react';
import {NavLink as Link, useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {Heading} from '../../../atoms';
import {Breadcrumb, Image, Tabs, Tab} from 'react-bootstrap';
import {TeamSquad} from "./components/TeamSquad";
import {useGetTeam, useGetTeamMatches} from "../../../api/team/teamClient_v1";
import {TeamCompetitions} from "./components/TeamCompetitions";
import {TeamStatistics} from "./components/TeamStatistics";
import loadingGif from "../../../assets/images/loading.gif";
import {TeamData} from "./components/TeamData";
import {MatchList} from "../../../organisms/MatchList";

export function TeamDetail() {
    let {id_team} = useParams();
    const [state] = useGetTeam(id_team);
    const [matchesState] = useGetTeamMatches(id_team);

    return (
        <div>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!state.isLoading && state.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!state.isLoading && !state.error) &&
            <div>
                <Breadcrumb>
                    <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                    <li className="breadcrumb-item"><Link to="/teams">Týmy</Link></li>
                    <li className="breadcrumb-item"><span className="active">{state.team_data.name}</span></li>
                </Breadcrumb>
                <Heading className="mt-4 mb-5">{state.team_data.name}</Heading>

                <TeamData state={state} />

                <Tabs className="mb-3" fill defaultActiveKey="squad" id="teamTabs">
                    <Tab eventKey="squad" title="Sestava">
                        <TeamSquad/>
                    </Tab>
                    <Tab eventKey="competition" title="Soutěže">
                        <TeamCompetitions/>
                    </Tab>
                    <Tab eventKey="statistics" title="Statistiky">
                        <TeamStatistics/>
                    </Tab>
                    <Tab eventKey="matches" title="Zápasy">
                        <MatchList matchesState={matchesState} admin={false} id_team={id_team} />
                    </Tab>
                </Tabs>
            </div>
            }
        </div>
    );
}
