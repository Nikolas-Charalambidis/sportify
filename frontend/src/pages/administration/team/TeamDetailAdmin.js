import React from 'react';
import {Breadcrumb, Tab, Tabs} from 'react-bootstrap';
import 'moment/locale/cs';
import {NavLink as Link, useHistory, useParams} from "react-router-dom";
import {useGetTeam} from "../../../api/teamClient_v1";
import {useGetMembers, useGetTeamMatches} from "../../../api/teamClient_v1";
import {TeamDataFormAdmin} from "../../../organisms/team/admin/TeamDataFormAdmin";
import {TeamCompetitions} from "../../../organisms/team/public/TeamCompetitions";
import {useAuth} from "../../../utils/auth";
import {MatchList} from "../../../organisms/match/MatchList";
import {TeamSquad} from "../../../organisms/team/public/TeamSquad";
import {useGetTeamPlayersByStatus} from "../../../api/teamMembershipClient_v1";
import {Heading} from "../../../atoms";
import {TeamAdminSelectCompetition} from "../../../organisms/administration/TeamAdminSelectCompetition";


export function TeamDetailAdmin() {
    const history = useHistory();
    const {user} = useAuth();
    if (!user) {
        window.flash("Na tuto stránku mají přístup jen přihlášení uživatelé!", "danger");
        history.replace('/');
    }
    let {id_team} = useParams();
    const [state] = useGetTeam(id_team);

    const [playersActiveState, fetchPlayersActiveState] = useGetTeamPlayersByStatus(id_team, "active");
    const [playersInactiveState, fetchPlayersInactiveState] = useGetTeamPlayersByStatus(id_team, "inactive");
    const [playersPendingState, fetchPlayersPendingState] = useGetTeamPlayersByStatus(id_team, "pending");
    const [playersDeclinedState, fetchPlayersDeclinedState] = useGetTeamPlayersByStatus(id_team, "declined");

    if(!state.isLoading && !state.error) {
        if(user.id_user !== state.team_data.id_leader){
            window.flash("Na tuto stránku má přístup pouze vedoucí zobrazovaného týmu!", "danger");
            history.replace('/');
        }
    }

    const [membersState] = useGetMembers(id_team);
    const [matchesState] = useGetTeamMatches(id_team);

    return (
        <div>
            {(state.isLoading || membersState.isLoading) && <div>Načítám data...</div>}
            {((!state.isLoading && state.error) || (!membersState.isLoading && membersState.error)) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {((!state.isLoading && !state.error) && (!membersState.isLoading && !membersState.error)) &&
                <div>
                    <Breadcrumb>
                        <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                        <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
                        <li className="breadcrumb-item"><Link to="/administration/teams">Moje týmy</Link></li>
                        <li className="breadcrumb-item"><span className="active">{state.team_data.name}</span></li>
                    </Breadcrumb>

                    <TeamDataFormAdmin team_data={state.team_data} membersState={membersState}/>

                    <Tabs className="mb-3" fill defaultActiveKey="squad" id="teamTabs">
                        <Tab eventKey="squad" title="Sestava">
                            <TeamSquad status="active" admin={true} playersState={playersActiveState}
                                       fetchActivePlayersState={fetchPlayersActiveState}
                                       fetchInactivePlayersState={fetchPlayersInactiveState}
                                       fetchPlayersPendingState={fetchPlayersPendingState}
                                       fetchPlayersDeclinedState={fetchPlayersDeclinedState}/>
                            <h2 className="mt-4">Neaktivní hráči</h2>
                            <TeamSquad status="inactive" admin={true} playersState={playersInactiveState}
                                       fetchActivePlayersState={fetchPlayersActiveState}
                                       fetchInactivePlayersState={fetchPlayersInactiveState}
                                       fetchPlayersPendingState={fetchPlayersPendingState}
                                       fetchPlayersDeclinedState={fetchPlayersDeclinedState} />
                            <h2 className="mt-4">Žádosti o členství</h2>
                            <TeamSquad status="pending" admin={true} playersState={playersPendingState}
                                       fetchActivePlayersState={fetchPlayersActiveState}
                                       fetchInactivePlayersState={fetchPlayersInactiveState}
                                       fetchPlayersPendingState={fetchPlayersPendingState}
                                       fetchPlayersDeclinedState={fetchPlayersDeclinedState}/>
                            <h2 className="mt-4">Zámítnuté žádosti</h2>
                            <TeamSquad status="declined" admin={true} playersState={playersDeclinedState}
                                       fetchActivePlayersState={fetchPlayersActiveState}
                                       fetchInactivePlayersState={fetchPlayersInactiveState}
                                       fetchPlayersPendingState={fetchPlayersPendingState}
                                       fetchPlayersDeclinedState={fetchPlayersDeclinedState}/>
                        </Tab>
                        <Tab eventKey="matches" title="Zápasy">
                            <MatchList matchesState={matchesState} admin={true} id_team={id_team} />
                        </Tab>
                        <Tab eventKey="competitions" title="Soutěže">
                            <h2 className="mt-4">Přihlášené soutěže</h2>
                            <TeamCompetitions/>
                            <h2 className="mt-4">Odeslání přihlášky do soutěže</h2>
                            <TeamAdminSelectCompetition/>
                        </Tab>
                    </Tabs>
                </div>
            }
        </div>
    );
}
