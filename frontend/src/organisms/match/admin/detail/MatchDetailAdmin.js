import React from 'react';
import {Heading} from "../../../../atoms";
import {useGetEvents, useGetShots} from "../../../../api/matchClient_v1";
import {Events} from "../base/Events";
import {MatchDetailHeaderAdmin} from "./MatchDetailHeaderAdmin";
import {ShotsParent} from "../base/ShotsParent";
import {MatchMatchupSingleDetailAdmin} from "./matchup/MatchMatchupSingleDetailAdmin";
import {MatchMatchupMultipleDetailAdmin} from "./matchup/MatchMatchupMultipleDetailAdmin";

export function MatchDetailAdmin({id_match, data}) {
    const [eventsStateHost, fetchEventsHost] = useGetEvents(id_match, 1);
    const [eventsStateGuest, fetchEventsGuest] = useGetEvents(id_match, 0);

    const [shotsStateHost] = useGetShots(id_match, 1);
    const [shotsStateGuest] = useGetShots(id_match, 0);

    return (
        <div>
            <MatchDetailHeaderAdmin hostName={data.host_name} guestName={data.guest_name} />

            <Heading size="lg" className="mt-5 h3MatchDetail text-left">Soupiska</Heading>
            {data.id_host === data.id_guest ?
                <MatchMatchupSingleDetailAdmin id_team={data.id_host} id_match={id_match}
                                               fetchEventsHost={fetchEventsHost} fetchEventsGuest={fetchEventsGuest}
                /> :
                <MatchMatchupMultipleDetailAdmin id_host={data.id_host} id_guest={data.id_guest} id_match={id_match}
                                                 fetchEventsHost={fetchEventsHost} fetchEventsGuest={fetchEventsGuest}
                />
            }

            <Heading size="lg" className="mt-5 h3MatchDetail text-left">Střely</Heading>
            <ShotsParent type="edit" params={{shotsStateHost: shotsStateHost, shotsStateGuest: shotsStateGuest}} />


            <Heading size="lg" className="mt-5 h3MatchDetail text-left">Události domácí</Heading>
            <Events type="edit" eventsState={eventsStateHost} fetchEvents={fetchEventsHost} />

            <Heading size="lg" className="mt-5 h3MatchDetail text-left">Události hosté</Heading>
            <Events type="edit" eventsState={eventsStateGuest} fetchEvents={fetchEventsGuest} />

        </div>
    );
}
