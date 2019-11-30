import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MatchMatchupCreateAdmin} from "./MatchMatchupCreateAdmin";
import {useGetMembers} from "../../../../../api/teamClient_v1";

export function MatchMatchupSingleCreateAdmin({interactive, hostState, guestState, setHostState, setGuestState}) {
    const [stateAvailablePlayers] = useGetMembers(hostState.id_team);
    const [statePlayers, setStatePlayers] = useState(stateAvailablePlayers);

    useEffect(() => {
        setStatePlayers(stateAvailablePlayers);
    }, [stateAvailablePlayers]);

    return (
        <Row>
            <Col lg={6} md={12} sm={12} xs={12} >
                <MatchMatchupCreateAdmin interactive={interactive} host={1}
                                         availablePlayers={statePlayers}
                                         state={hostState}
                                         setState={setHostState}
                                         setAvailablePlayers={setStatePlayers}
                />
            </Col>

            <Col lg={6} md={12} sm={12} xs={12} >
                <MatchMatchupCreateAdmin interactive={interactive} id_team={guestState.id_team} host={0}
                                         availablePlayers={statePlayers}
                                         state={guestState}
                                         setState={setGuestState}
                                         setAvailablePlayers={setStatePlayers}
                />
            </Col>
        </Row>
    );
}
