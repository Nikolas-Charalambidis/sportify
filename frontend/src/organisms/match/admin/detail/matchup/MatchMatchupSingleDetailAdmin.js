import React from 'react';
import {useGetAvailablePlayers} from "../../../../../api/teamMembershipClient_v1";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MatchMatchupDetailAdmin} from "./MatchMatchupDetailAdmin";
import {useGetMatchup} from "../../../../../api/matchClient_v1";

export function MatchMatchupSingleDetailAdmin({id_team, id_match, fetchEventsHost, fetchEventsGuest}) {
    const [stateAvailablePlayers, fetchAvailablePlayers] = useGetAvailablePlayers(id_team, id_match);

    const [matchupStateHost, fetchMatchupHost] = useGetMatchup(id_match, 1);
    const [matchupStateGuest, fetchMatchupGuest] = useGetMatchup(id_match, 0);

    return (
        <Row>
            <Col lg={6} md={12} sm={12} xs={12} >
                <MatchMatchupDetailAdmin id_team={id_team} id_match={id_match} host={1}
                                         availablePlayers={stateAvailablePlayers} fetchAvailablePlayers={fetchAvailablePlayers}
                                         matchupState={matchupStateHost} fetchMatchup={fetchMatchupHost}
                                         fetchEvents={fetchEventsHost} />
            </Col>

            <Col lg={6} md={12} sm={12} xs={12} >
                <MatchMatchupDetailAdmin id_team={id_team} id_match={id_match} host={0}
                                         availablePlayers={stateAvailablePlayers} fetchAvailablePlayers={fetchAvailablePlayers}
                                         matchupState={matchupStateGuest} fetchMatchup={fetchMatchupGuest}
                                         fetchEvents={fetchEventsGuest} />
            </Col>
        </Row>
    );
}
