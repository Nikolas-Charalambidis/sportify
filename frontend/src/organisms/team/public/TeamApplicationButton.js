import React, {useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {TeamRequestModal} from "../../../basicComponents/TeamRequestModal";
import {useGetTeamPlayers} from "../../../api/teamMembershipClient_v1";
import {useGetTeamPositions} from "../../../api/othersClient_v1";

export function TeamApplicationButton({id_team, user}) {

    const [allTeamPlayers] = useGetTeamPlayers(id_team);
    const [positions] = useGetTeamPositions();
    const [positionsState, setPositionsState] = useState({id_position: null});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Row>
                <Col className="mb-4 mt-lg-0" lg={{span: 5, offset: 4}} md={{span: 8, offset: 2}} sm={{span: 10, offset: 1}} xs={{span: 11, offset: 1}}>
                    <Button variant="primary" onClick={ () => {
                        const [membership] = allTeamPlayers.players.filter((objectsInArray) => {
                                (objectsInArray.id_user === user.id_user && objectsInArray.status === "active")
                                && window.flash("Již jste zařazen na jako aktivní hráč na soupisce tohoto týmu", "info");
                                (objectsInArray.id_user === user.id_user && objectsInArray.status === "inactive")
                                && window.flash("Již jste zařazen na jako neaktivní hráč na soupisce tohoto týmu", "info");
                                (objectsInArray.id_user === user.id_user && objectsInArray.status === "pending")
                                && window.flash("Vaše žádost o členství v tomto týmu čeká na vyřizení", "info");
                                (objectsInArray.id_user === user.id_user && objectsInArray.status === "declined")
                                && window.flash("Vaše žádost o členství v tomto týmu byla zamítnuta", "info");
                                return (objectsInArray.id_user === user.id_user);
                            }
                        );
                        (membership === undefined) && handleShow();
                    }}>
                        Odeslat žádost o zařazení do týmu
                    </Button>

                    <TeamRequestModal show={show} handleClose={handleClose} positions={positions.positions} positionsState={positionsState}
                                      setPositionsState={setPositionsState} id_user={user.id_user} id_team={id_team}/>
                </Col>
            </Row>
        </div>
    );
}
