import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MatchMatchupCreateAdmin} from "./MatchMatchupCreateAdmin";
import {useGetMembers} from "../../../../../api/teamClient_v1";

export function MatchMatchupMultipleCreateAdmin({hostState, guestState, setHostState, setGuestState, interactive}) {
    const [stateAvailablePlayersHost] = useGetMembers(hostState.id_team);
    const [statePlayersHost, setStatePlayersHost] = useState(stateAvailablePlayersHost);

    useEffect(() => {
        setStatePlayersHost(stateAvailablePlayersHost);
    }, [stateAvailablePlayersHost]);

    const [stateAvailablePlayersGuest] = useGetMembers(guestState.id_team);
    const [statePlayersGuest, setStatePlayersGuest] = useState(stateAvailablePlayersGuest);

    useEffect(() => {
        setStatePlayersGuest(stateAvailablePlayersGuest);
    }, [stateAvailablePlayersGuest]);

    return (
        <Row>
            <Col lg={6} md={12} sm={12} xs={12} >
                <MatchMatchupCreateAdmin host={1} intaractive={interactive}
                                         availablePlayers={statePlayersHost}
                                         state={hostState}
                                         setState={setHostState}
                                         setAvailablePlayers={setStatePlayersHost} />
            </Col>

            <Col lg={6} md={12} sm={12} xs={12} >
                <MatchMatchupCreateAdmin host={0} intaractive={interactive}
                                         availablePlayers={statePlayersGuest}
                                         state={guestState}
                                         setState={setGuestState}
                                         setAvailablePlayers={setStatePlayersGuest}/>
            </Col>
        </Row>
    );
}
