import React from 'react';
import {useGetAvailablePlayers} from "../../../../api/teamMembership/teamMembershipClient_v1";
import {Tab, Tabs} from "react-bootstrap";
import {TeamTab} from "./TeamTab";

export function MatchDetailMultiple({id_match, data}) {
    const [stateAvailablePlayersHost, fetchAvailablePlayersHost] = useGetAvailablePlayers(data.id_host, id_match);
    const [stateAvailablePlayersGuest, fetchAvailablePlayersGuest] = useGetAvailablePlayers(data.id_guest, id_match);

    return (
        <div>
            <Tabs className="mb-3" fill defaultActiveKey="host" id="teamTabs">
                <Tab eventKey="host" title={'Host: ' + data.host_name}>
                    <TeamTab id_team={data.id_host} id_match={id_match} host={1}
                             availablePlayers={stateAvailablePlayersHost} fetchAvailablePlayers={fetchAvailablePlayersHost}
                    />

                </Tab>
                <Tab eventKey="guest" title={'Guest: ' + data.guest_name}>
                    <TeamTab id_team={data.id_guest} id_match={id_match} host={0}
                             availablePlayers={stateAvailablePlayersGuest} fetchAvailablePlayers={fetchAvailablePlayersGuest}
                    />
                </Tab>
            </Tabs>
        </div>
    );
}
