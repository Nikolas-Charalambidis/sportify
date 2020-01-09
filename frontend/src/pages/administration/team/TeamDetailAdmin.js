import React from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import 'moment/locale/cs';
import {useHistory, useParams} from "react-router-dom";
import {useGetTeam} from "../../../api/teamClient_v1";
import {useGetMembers, useGetTeamMatches} from "../../../api/teamClient_v1";
import {TeamDataFormAdmin} from "../../../organisms/team/admin/TeamDataFormAdmin";
import {TeamCompetitions} from "../../../organisms/team/public/TeamCompetitions";
import {useAuth} from "../../../utils/auth";
import {MatchList} from "../../../organisms/match/MatchList";
import {Heading} from "../../../basicComponents";
import {TeamSquadAdmin} from "../../../organisms/team/admin/TeamSquadAdmin";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";
import {TeamAdminSelectCompetition} from "../../../organisms/administration/TeamAdminSelectCompetition";
import {TeamDetailAdminBreadcrumbs} from "../../../organisms/breadcrumbs/TeamDetailAdminBreadcrumbs";

export function TeamDetailAdmin() {
    const history = useHistory();
    const {user} = useAuth();

    let {id_team} = useParams();
    const [state] = useGetTeam(id_team);

    if(!state.isLoading && !state.error) {
        if(user.id_user !== state.team_data.id_leader){
            window.flash("Na tuto stránku má přístup pouze vedoucí zobrazovaného týmu!", "danger");
            history.replace('/administration/teams');
        }
    }

    const [membersState] = useGetMembers(id_team);
    const [matchesState] = useGetTeamMatches(id_team);

    if(state.isLoading || membersState.isLoading) {
        return <div>Načítám data...</div>;
    }

    if((!state.isLoading && state.error) || (!membersState.isLoading && membersState.error)) {
        return <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>;
    }

    return (
        <div>
            {((!state.isLoading && !state.error) && (!membersState.isLoading && !membersState.error)) ?
                <div>
                    <TeamDetailAdminBreadcrumbs teamName={state.team_data.name} />
                    <TeamDataFormAdmin team_data={state.team_data} membersState={membersState}/>

                    <Tabs className="mb-3" fill defaultActiveKey="squad" id="teamTabs">
                        <Tab eventKey="squad" title="Sestava">
                            <TeamSquadAdmin id_team={id_team} />
                        </Tab>
                        <Tab eventKey="matches" title="Zápasy">
                            <MatchList matchesState={matchesState} admin={true} id_team={id_team} />
                        </Tab>
                        <Tab eventKey="competitions" title="Soutěže">
                            <h2 className="mt-4">Přihlášené soutěže</h2>
                            <TeamCompetitions admin={true}/>
                            <h2 className="mt-4">Odeslání přihlášky do soutěže</h2>
                            <TeamAdminSelectCompetition/>
                        </Tab>
                    </Tabs>
                </div>
                : <UnexpectedError />
            }
        </div>
    );
}
