import {Heading} from "../../../../../basicComponents";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {AddEventModal} from "./AddEventModal";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

export function MatchInteractiveTeamTab({ teamName, teamState, teamSetState, setPlay, timerState, pauseMatchOnEvent, host}) {
    const handleAddEvent = (values) => {
        const { id_team, matchups, events, shots } = teamState;
        teamSetState({
            id_team: id_team,
            matchups: matchups,
            events: [...events, values],
            shots: shots
        });
        window.flash("Event byl úspěšně přidán", "success");
        closeModal();
        setPlay(true);
    };

    const handleChangeShots = (x) => {
        const { id_team, matchups, events, shots } = teamState;
        const newShots = shots + x;
        if(newShots >= 0) {
            teamSetState({
                id_team: id_team,
                matchups: matchups,
                events: events,
                shots: newShots
            });
            window.flash("Počet střel byl změněn", "success");
        }
    };

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
        setPlay(true);
    };

    const openModal = (type) => {
        setPlay(false);
        setShowModal({
            show: true,
            type: type
        });
    };

    function getSuspensionMinutes() {
        let minutes = 0;

        teamState.events.forEach(function (item) {
            const suspensionMinute = getSuspensionType(item.type);
            minutes += suspensionMinute;
        });

        return minutes;
    }

    function getSuspensionType(type) {
        switch (type) {
            case "suspension_2":
                return 2;
            case "suspension_2_2":
                return 4;
            case "suspension_5":
                return 5;
            case "suspension_pp":
                return 10;
            case "suspension_pp_end":
                return 20;
            default: return 0;
        }
    }

    return (
        <div>
            <Heading className="d-block d-md-none d-lg-none" size="lg">
                {teamName}
                <hr/>
            </Heading>

            <Heading className="text-center mt-3" size="sm">Počet střel
                <FontAwesomeIcon className="ml-2" icon={Icons.faMeteor} size="1x"/>
            </Heading>
            <div className="plusMinusDiv mb-2">
                <Row>
                    <Col lg={{ span: 2, offset: 3 }} md={{ span: 2, offset: 3 }}  sm={{ span: 2, offset: 3 }}  xs={{ span: 2, offset: 3 }} >
                        <Button variant="link" onClick={() => handleChangeShots(-1)}>
                            <FontAwesomeIcon className="addIcon" icon={Icons.faMinusSquare} size="4x"/>
                        </Button>
                    </Col>
                    <Col lg={2} md={2} sm={2} xs={2}>
                        <Heading className="text-center mt-3 ml-2" size="sm">
                            <span className="bgBlack">{teamState.shots}</span>
                        </Heading>
                    </Col>
                    <Col lg={2} md={2} sm={2} xs={2} >
                        <Button variant="link" onClick={() => handleChangeShots(1)}>
                            <FontAwesomeIcon className="addIcon" icon={Icons.faPlusSquare} size="4x"/>
                        </Button>
                   </Col>
                </Row>
            </div>

            <div className="text-center">
                <Button variant="primary" onClick={() => {
                    setPlay(false);
                    pauseMatchOnEvent();
                    openModal("goal");
                }}>
                    Přidat gól
                </Button>
            </div>

            <Heading className="text-center mt-4" size="sm">
                Trestných minut <span className="bgBlack">{getSuspensionMinutes()}</span>
            </Heading>
            <div className="text-center mb-4">
                <Button variant="primary" onClick={() => {
                    setPlay(false);
                    pauseMatchOnEvent();
                    openModal("suspension");
                }}>
                    Přidat trest
                </Button>
            </div>

            <AddEventModal id_team={teamState.id_team} host={host} params={showModal}
                           handleClose={closeModal} matchup={teamState.matchups}
                           handleAddEvent={handleAddEvent} timerState={timerState}
            />

        </div>
    )
}