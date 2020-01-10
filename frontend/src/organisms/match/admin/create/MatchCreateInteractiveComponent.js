import React, {useState} from 'react';
import {MatchInteractiveForm} from "../../../../organisms/match/admin/create/interactive/MatchInteractiveForm";
import {MatchInteractiveSelect} from "../../../../organisms/match/admin/create/interactive/MatchInteractiveSelect";
import {useGetTeams} from "../../../../api/teamClient_v1";

export function MatchCreateInteractiveComponent({ params, handleCreateMatch }) {
    const [matchupSelected, setMatchupSelected] = useState(false);
    const [teamsState] = useGetTeams();
    const { hostState, setHostState, guestState, setGuestState } = params;
    
    const getTeamName = (host) => {
        let team = null;
        if(host) {
            team = teamsState.teams_data.filter(item => item.id_team === hostState.id_team);
        } else {
            team = teamsState.teams_data.filter(item => item.id_team === guestState.id_team)
        }
        return team[0].name;
    };

    return (
        <div>
            {matchupSelected ?
                <MatchInteractiveForm hostState={hostState} guestState={guestState}
                    setHostState={setHostState} setGuestState={setGuestState}
                    hostName={getTeamName(true)} guestName={getTeamName(false)} handleCreateMatch={handleCreateMatch}
                /> :
                <MatchInteractiveSelect teamsState={teamsState} hostState={hostState} guestState={guestState}
                    setHostState={setHostState} setGuestState={setGuestState} setMatchupSelected={setMatchupSelected}
                />
            }
        </div>
    );
}
