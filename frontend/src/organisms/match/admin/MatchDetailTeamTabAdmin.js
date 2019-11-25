import React from 'react';
import {Matchup} from "./matchup/Matchup";
import {Events} from "./events/Events";
import {useGetEvents, useGetMatchup, useGetShots} from "../../../api/matchClient_v1";
import {Shots} from "./events/Shots";

export function MatchDetailTeamTabAdmin({id_team, id_match, host, availablePlayers, fetchAvailablePlayers}) {
    const [matchupState, fetchMatchup] = useGetMatchup(id_match, host);
    const [eventsState, fetchEvents] = useGetEvents(id_match, host);
    const [shotsState] = useGetShots(id_match, host);

    return (
        <div>
            <Matchup id_team={id_team} id_match={id_match} host={host}
                     availablePlayers={availablePlayers} fetchAvailablePlayers={fetchAvailablePlayers}
                     matchupState={matchupState} fetchMatchup={fetchMatchup}
                     fetchEvents={fetchEvents}
            />
            <Shots id_team={id_team} id_match={id_match} host={host} shotsState={shotsState} />
            <Events eventsState={eventsState} fetchEvents={fetchEvents}
            />
        </div>
    );
}
