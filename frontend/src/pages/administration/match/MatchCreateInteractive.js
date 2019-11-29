import React, {useState} from 'react';
import {useGetTeams} from "../../../api/teamClient_v1";
import {Breadcrumb, Button} from "react-bootstrap";
import {Heading} from "../../../atoms";
import {MatchTeamSelect} from "../../../organisms/match/admin/create/MatchTeamSelect";
import {MatchMatchupSingleCreateAdmin} from "../../../organisms/match/admin/create/matchup/MatchMatchupSingleCreateAdmin";
import {MatchMatchupMultipleCreateAdmin} from "../../../organisms/match/admin/create/matchup/MatchMatchupMultipleCreateAdmin";

export function MatchCreateInteractive() {
    const [teamsState] = useGetTeams();
    const [hostState, setHostState] = useState({
        id_team: null,
        matchups: [],
        events: [],
        shots: 0
    });
    const [guestState, setGuestState] = useState({
        id_team: null,
        matchups: [],
        events: [],
        shots: 0
    });

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
                    <Button variant="primary" >
                        Potvrdit výběr hráčů
                    </Button>
                </div>
                }
            </div>
            }
        </div>
    );
}
