import React from 'react';
import {useGetAvailablePlayers} from "../../../api/teamMembershipClient_v1";
import {Tab, Tabs} from "react-bootstrap";
import {MatchDetailTeamTabAdmin} from "./MatchDetailTeamTabAdmin";

export function MatchDetailMultipleAdmin({id_match, data}) {
    const [stateAvailablePlayersHost, fetchAvailablePlayersHost] = useGetAvailablePlayers(data.id_host, id_match);
    const [stateAvailablePlayersGuest, fetchAvailablePlayersGuest] = useGetAvailablePlayers(data.id_guest, id_match);

    return (
        <div>
            <Tabs className="mb-3" fill defaultActiveKey="host" id="teamTabs">
                <Tab eventKey="host" title={<span><b>Domácí: </b> {data.host_name}</span>}>
                    <MatchDetailTeamTabAdmin id_team={data.id_host} id_match={id_match} host={1}
                                             availablePlayers={stateAvailablePlayersHost} fetchAvailablePlayers={fetchAvailablePlayersHost}
                    />

                </Tab>
                <Tab eventKey="guest" title={<span><b>Hosté: </b> {data.guest_name}</span>}>
                    <MatchDetailTeamTabAdmin id_team={data.id_guest} id_match={id_match} host={0}
                                             availablePlayers={stateAvailablePlayersGuest} fetchAvailablePlayers={fetchAvailablePlayersGuest}
                    />
                </Tab>
            </Tabs>
        </div>
    );
}
