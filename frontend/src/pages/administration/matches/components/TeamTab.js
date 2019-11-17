import React from 'react';
import {Matchup} from "./matchup/Matchup";
import {Events} from "./events/Events";
import {useGetEvents, useGetMatchup} from "../../../../api/matches/matchClient_v1";

export function TeamTab({id_team, id_match, host, availablePlayers, fetchAvailablePlayers}) {
    const [matchupState, fetchMatchup] = useGetMatchup(id_match, host);
    const [eventsState, fetchEvents] = useGetEvents(id_match, host);

    return (
        <div>
            <Matchup id_team={id_team} id_match={id_match} host={host}
                     availablePlayers={availablePlayers} fetchAvailablePlayers={fetchAvailablePlayers}
                     matchupState={matchupState} fetchMatchup={fetchMatchup}
                     fetchEvents={fetchEvents}
            />

            <Events id_team={id_team} id_match={id_match} host={host}
                    eventsState={eventsState} fetchEvents={fetchEvents}
            />
        </div>
    );
}
