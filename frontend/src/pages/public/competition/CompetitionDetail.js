import React from 'react';
import {NavLink as Link, useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {Heading} from '../../../basicComponents';
import {Breadcrumb, Image, Tabs, Tab} from 'react-bootstrap';
import {useGetCompetitionDetail} from "../../../api/competitionClient_v1";
import loadingGif from "../../../assets/images/loading.gif";
import {CompetitionData} from "../../../organisms/competition/CompetitionData";
import {CompetitionTeams} from "../../../organisms/competition/CompetitionTeams";
import {CompetitionResults} from "../../../organisms/competition/CompetitionResults";
import {CompetitionStatisticsPlayers} from "../../../organisms/competition/statistics/CompetitionStatisticsPlayers";
import {CompetitionStatisticsGoalkeepers} from "../../../organisms/competition/statistics/CompetitionStatisticsGoalkeepers";

export function CompetitionDetail() {
    let {id_competition} = useParams();
    const [state] = useGetCompetitionDetail(id_competition);

    return (
        <div>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!state.isLoading && state.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!state.isLoading && !state.error) &&
            <div>
                <Breadcrumb>
                    <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                    <li className="breadcrumb-item"><Link to="/competitions">Soutěže</Link></li>
                    <li className="breadcrumb-item"><span className="active">{state.competition_data.name}</span></li>
                </Breadcrumb>
                <Heading className="mt-4 mb-5">{state.competition_data.name}</Heading>

                <CompetitionData state={state} />

                <Tabs className="mb-3" fill defaultActiveKey="squad" id="competitionTabs">
                    <Tab eventKey="squad" title="Týmy">
                        <CompetitionTeams/>
                    </Tab>
                    <Tab eventKey="competition" title="Výsledky zápasů">
                        <CompetitionResults/>
                    </Tab>
                    <Tab eventKey="statistics" title="Statistiky">
                        <Heading className="mt-4" size="lg">Hráči</Heading>
                        <CompetitionStatisticsPlayers isGoalKeeper={0}/>

                        <Heading className="mt-4" size="lg">Brankáři</Heading>
                        <CompetitionStatisticsGoalkeepers isGoalKeeper={1}/>
                    </Tab>
                </Tabs>
            </div>
            }
        </div>
    );
}
