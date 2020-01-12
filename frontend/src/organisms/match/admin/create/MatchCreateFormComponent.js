import React, {useState} from 'react';
import { Heading } from '../../../../basicComponents';
import { Button } from 'react-bootstrap';
import {MatchTeamSelect} from "../../../../organisms/match/admin/create/MatchTeamSelect";
import {ShotsParent} from "../../../../organisms/match/admin/base/ShotsParent";
import {Events} from "../../../../organisms/match/admin/base/Events";
import {MatchMatchupSingleCreateAdmin} from "../../../../organisms/match/admin/create/matchup/MatchMatchupSingleCreateAdmin";
import {MatchMatchupMultipleCreateAdmin} from "../../../../organisms/match/admin/create/matchup/MatchMatchupMultipleCreateAdmin";
import {useGetTeams} from "../../../../api/teamClient_v1";
import {LoadingGif} from "../../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../../../basicComponents/UnexpectedError";

export function MatchCreateFormComponent({params, handleCreateMatch}) {
    const {hostState, setHostState, guestState, setGuestState} = params;
    const [teamsState] = useGetTeams();

    const [display, setDisplay] = useState(false);

    if(teamsState.isLoading) {
        return <LoadingGif />;
    }

    if(!teamsState.isLoading && teamsState.error) {
        return <DataLoadingError />;
    }

    return (
    <div>
        {(!teamsState.isLoading && !teamsState.error) ?
            <div>
                <MatchTeamSelect teams={teamsState.teams_data} setDisplay={setDisplay}
                                 setHostState={setHostState} setGuestState={setGuestState} />


                {(hostState.id_team && guestState.id_team && display) &&
                    <div>
                        <Heading size="lg" className="mt-5 h3MatchDetail text-left">Soupiska</Heading>
                        {hostState.id_team === guestState.id_team ?
                            <MatchMatchupSingleCreateAdmin hostState={hostState} guestState={guestState}
                                                           setHostState={setHostState} setGuestState={setGuestState}
                                                           intaractive={false}
                            /> :
                            <MatchMatchupMultipleCreateAdmin hostState={hostState} guestState={guestState}
                                                             setHostState={setHostState} setGuestState={setGuestState}
                                                             intaractive={false}
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

                        <Button className="float-right mt-3" variant="primary" onClick={handleCreateMatch}>
                            Vytvořit zápas
                        </Button>
                    </div>
                }
            </div>
            : <UnexpectedError/>
        }
    </div>
    );
}
