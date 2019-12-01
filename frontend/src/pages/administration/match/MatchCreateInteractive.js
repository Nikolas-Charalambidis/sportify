import React, {useState} from 'react';
import {useGetTeams} from "../../../api/teamClient_v1";
import {Breadcrumb} from "react-bootstrap";
import {Heading} from "../../../atoms";
import {MatchInteractiveForm} from "../../../organisms/match/admin/create/interactive/MatchInteractiveForm";
import {NavLink as Link} from "react-router-dom";
import {MatchInteractiveSelect} from "../../../organisms/match/admin/create/interactive/MatchInteractiveSelect";

export function MatchCreateInteractive() {
    const [teamsState] = useGetTeams();
    const [matchupSelected, setMatchupSelected] = useState(false);
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
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
                <li className="breadcrumb-item"><span className="active">Interaktivní zápas</span></li>
            </Breadcrumb>

            <Heading>Vytvoření zápasu</Heading>
            {matchupSelected ?
                <MatchInteractiveForm hostState={hostState} guestState={guestState}
                                      setHostState={setHostState} setGuestState={setGuestState}
                                      hostName={getTeamName(true)} guestName={getTeamName(false)}
                /> :
                <MatchInteractiveSelect teamsState={teamsState} hostState={hostState} guestState={guestState}
                                        setHostState={setHostState} setGuestState={setGuestState} setMatchupSelected={setMatchupSelected}
                />
            }
        </div>
    );
}
