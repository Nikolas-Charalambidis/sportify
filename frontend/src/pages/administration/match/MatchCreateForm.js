import React, { useState } from 'react';
import { Heading } from '../../../atoms';
import { Breadcrumb, Button } from 'react-bootstrap';
import { useGetTeams } from '../../../api/teamClient_v1';
import {MatchTeamSelect} from "../../../organisms/match/admin/create/MatchTeamSelect";
import {ShotsParent} from "../../../organisms/match/admin/base/ShotsParent";
import {Events} from "../../../organisms/match/admin/base/Events";
import {MatchMatchupSingleCreateAdmin} from "../../../organisms/match/admin/create/matchup/MatchMatchupSingleCreateAdmin";
import {MatchMatchupMultipleCreateAdmin} from "../../../organisms/match/admin/create/matchup/MatchMatchupMultipleCreateAdmin";

export function MatchCreateForm() {
    const [formState, setFormState] = useState(false);

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

    const handleCreateMatch = () => {
        validateForm();
        if(formState){
            createMatch();
        }
    };

    const validateForm = () => {
        if(hostState.matchups.length > 0 && guestState.matchups.length > 0){
            setFormState(true);
        } else {
            window.flash("Nemůžete odeslat formulář s prázdnou soupiskou", "danger")
        }
    };

    const createMatch = () => {
        setHostState({...hostState, host: true});
        setGuestState({...guestState, host: false});
        // Call function for save data into DB here... also handle errors, success and redirect...
    };

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
