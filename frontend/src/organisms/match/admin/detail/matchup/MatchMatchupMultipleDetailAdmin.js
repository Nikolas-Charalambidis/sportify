import React from 'react';
import {useGetAvailablePlayers} from "../../../../../api/teamMembershipClient_v1";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MatchMatchupDetailAdmin} from "./MatchMatchupDetailAdmin";
import {useGetMatchup} from "../../../../../api/matchClient_v1";

export function MatchMatchupMultipleDetailAdmin({id_host, id_guest, id_match, fetchEventsHost, fetchEventsGuest}) {
    const [stateAvailablePlayersHost, fetchAvailablePlayersHost] = useGetAvailablePlayers(id_host, id_match, "active");
    const [stateAvailablePlayersGuest, fetchAvailablePlayersGuest] = useGetAvailablePlayers(id_guest, id_match, "active");

    const [matchupStateHost, fetchMatchupHost] = useGetMatchup(id_match, 1);
    const [matchupStateGuest, fetchMatchupGuest] = useGetMatchup(id_match, 0);

    return (
        <Row>
            <Col lg={6} md={12} sm={12} xs={12} >
                <MatchMatchupDetailAdmin id_team={id_host} id_match={id_match} host={1}
                                         availablePlayers={stateAvailablePlayersHost} fetchAvailablePlayers={fetchAvailablePlayersHost}
                                         matchupState={matchupStateHost} fetchMatchup={fetchMatchupHost}
                                         fetchEvents={fetchEventsHost} />
            </Col>

            <Col lg={6} md={12} sm={12} xs={12} >
                <MatchMatchupDetailAdmin id_team={id_guest} id_match={id_match} host={0}
                                         availablePlayers={stateAvailablePlayersGuest} fetchAvailablePlayers={fetchAvailablePlayersGuest}
                                         matchupState={matchupStateGuest} fetchMatchup={fetchMatchupGuest}
                                         fetchEvents={fetchEventsGuest} />
            </Col>
        </Row>
    );
}
