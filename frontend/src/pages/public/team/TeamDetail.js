import React from 'react';
import {useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {Heading} from '../../../basicComponents';
import {Tabs, Tab} from 'react-bootstrap';
import {TeamSquad} from "../../../organisms/team/public/TeamSquad";
import {useGetTeam, useGetTeamMatches} from "../../../api/teamClient_v1";
import {TeamCompetitions} from "../../../organisms/team/public/TeamCompetitions";
import {TeamStatistics} from "../../../organisms/team/public/TeamStatistics";
import {TeamData} from "../../../organisms/team/public/TeamData";
import {MatchList} from "../../../organisms/match/MatchList";
import {useGetTeamPlayersByStatus} from "../../../api/teamMembershipClient_v1";
import {useAuth} from "../../../utils/auth";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";
import {TeamDetailBreadcrumbs} from "../../../organisms/breadcrumbs/TeamDetailBreadcrumbs";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {TeamApplicationButton} from "../../../organisms/team/public/TeamApplicationButton";

export function TeamDetail() {
    const {user} = useAuth();
    let {id_team} = useParams();

    const [state] = useGetTeam(id_team);
    const [matchesState] = useGetTeamMatches(id_team);
    const [playersState] = useGetTeamPlayersByStatus(id_team, "active");

    const header = (
        <div>
            <TeamDetailBreadcrumbs />
        </div>
    );

    if(state.isLoading) {
        return <LoadingGif header={header}/>;
    }

    if(!state.isLoading && state.error) {
        return <DataLoadingError header={header}/>;
    }

    return (
        <div>
            {(!state.isLoading && !state.error) ?
                <div>
                    {header}
                    <Heading className="mt-4 mb-5">{state.team_data.name}</Heading>

                    <TeamData state={state} />

                    {user && <TeamApplicationButton id_team={id_team} user={user}/> }

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
