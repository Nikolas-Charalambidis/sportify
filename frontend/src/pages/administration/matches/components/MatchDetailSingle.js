import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {useGetAvailablePlayers} from "../../../../api/teamMembership/teamMembershipClient_v1";
import {TeamTab} from "./TeamTab";

export function MatchDetailSingle({id_match, data}) {
    const [stateAvailablePlayers, fetchAvailablePlayers] = useGetAvailablePlayers(data.id_host, id_match);

    return (
            <div>
                <Tabs className="mb-3" fill defaultActiveKey="host" id="teamTabs">
                    <Tab eventKey="host" title={<span><b>Domácí: </b> {data.host_name}</span>}>
                        <TeamTab id_team={data.id_host} id_match={id_match} host={1}
                                 availablePlayers={stateAvailablePlayers} fetchAvailablePlayers={fetchAvailablePlayers}
                        />

                    </Tab>
                    <Tab eventKey="guest" title={<span><b>Hosté: </b> {data.guest_name}</span>}>
                        <TeamTab id_team={data.id_guest} id_match={id_match} host={0}
                                 availablePlayers={stateAvailablePlayers} fetchAvailablePlayers={fetchAvailablePlayers}
                        />
                    </Tab>
                </Tabs>
            </div>
    );
}
