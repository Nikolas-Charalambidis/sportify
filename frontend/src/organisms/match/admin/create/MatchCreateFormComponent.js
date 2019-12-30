import React from 'react';
import { Heading } from '../../../../basicComponents';
import { Breadcrumb, Button } from 'react-bootstrap';
import {MatchTeamSelect} from "../../../../organisms/match/admin/create/MatchTeamSelect";
import {ShotsParent} from "../../../../organisms/match/admin/base/ShotsParent";
import {Events} from "../../../../organisms/match/admin/base/Events";
import {MatchMatchupSingleCreateAdmin} from "../../../../organisms/match/admin/create/matchup/MatchMatchupSingleCreateAdmin";
import {MatchMatchupMultipleCreateAdmin} from "../../../../organisms/match/admin/create/matchup/MatchMatchupMultipleCreateAdmin";
import {useGetTeams} from "../../../../api/teamClient_v1";

export function MatchCreateFormComponent({params, handleCreateMatch}) {
    const {hostState, setHostState, guestState, setGuestState} = params;
    const [teamsState] = useGetTeams();

    return (
    <div>
        <Breadcrumb>
        <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
        <Breadcrumb.Item active>Nový zápas</Breadcrumb.Item>
        </Breadcrumb>

        <Heading>Vytvoření zápasu</Heading>
        {teamsState.isLoading && <div>Načítám data...</div>}
        {(!teamsState.isLoading && teamsState.error) && <div>Data se nepodařilo načíst</div>}
        {(!teamsState.isLoading && !teamsState.error) &&
            <div>
                <MatchTeamSelect teams={teamsState.teams_data}
                                 setHostState={setHostState} setGuestState={setGuestState} />

                {(hostState.id_team && guestState.id_team) &&
                    <div>
                        <Heading size="lg" className="mt-5 h3MatchDetail text-left">Soupiska</Heading>
                        {hostState.id_team === guestState.id_team ?
                            <MatchMatchupSingleCreateAdmin hostState={hostState} guestState={guestState}
                                                           setHostState={setHostState} setGuestState={setGuestState}
                            /> :
                            <MatchMatchupMultipleCreateAdmin hostState={hostState} guestState={guestState}
                                                             setHostState={setHostState} setGuestState={setGuestState}
                            />
                        }
                        <Heading size="lg" className="mt-5 h3MatchDetail text-left">Střely</Heading>
                        <ShotsParent type="create" params={{
                            hostState: hostState,
                            setHostState: setHostState,
                            guestState: guestState,
                            setGuestState: setGuestState
                        }} />

                        <Heading size="lg" className="mt-5 h3MatchDetail text-left">Události domácí</Heading>
                        <Events type="create" eventsState={hostState} fetchEvents={setHostState} />

                        <Heading size="lg" className="mt-5 h3MatchDetail text-left">Události hosté</Heading>
                        <Events type="create" eventsState={guestState} fetchEvents={setGuestState} />

                        <Button variant="primary" onClick={handleCreateMatch}>
                            Vytvořit zápas
                        </Button>
                    </div>
                }
            </div>
        }
    </div>
    );
}
