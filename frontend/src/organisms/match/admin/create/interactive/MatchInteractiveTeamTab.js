import {Heading} from "../../../../../basicComponents";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {AddEventModal} from "./AddEventModal";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";


export function MatchInteractiveTeamTab({ teamName, teamState, teamSetState, setPlay, timerState, pauseMatchOnEvent}) {
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
            <Heading size="lg">
                {teamName}
                <hr/>
            </Heading>

            <Heading className="text-center" size="sm">Počet střel
                <FontAwesomeIcon className="ml-2" icon={Icons.faMeteor} size="1x"/>
            </Heading>
            <div className="plusMinusDiv mb-2">
                <Row>
                    <Col lg={3} md={3} sm={3} xs={3} />
                    <Col lg={2} md={2} sm={2} xs={2} >
                        <Button variant="link" onClick={() => handleChangeShots(-1)}>
                            <FontAwesomeIcon className="addIcon" icon={Icons.faMinusSquare} size="3x"/>
                        </Button>
                    </Col>
                    <Col lg={2} md={2} sm={2} xs={2} >{teamState.shots}</Col>
                    <Col lg={2} md={2} sm={2} xs={2} >
                        <Button variant="link" onClick={() => handleChangeShots(1)}>
                            <FontAwesomeIcon className="addIcon" icon={Icons.faPlusSquare} size="3x"/>
                        </Button>
                   </Col>
                    <Col lg={3} md={3} sm={3} xs={3} />
                </Row>
            </div>

            <Heading className="text-center mt-5" size="sm">
                Počet gólů <span className="bgBlack">{teamState.events.filter(g => g.type === "goal").length}</span>
            </Heading>
            <div className="text-center">
                <Button variant="primary" onClick={() => {
                    setPlay(false);
                    pauseMatchOnEvent();
                    openModal("goal");
                }}>
                    Přidat gól
                </Button>
            </div>

            <Heading className="text-center mt-5" size="sm">
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

            <AddEventModal id_team={teamState.id_team} host={1} params={showModal}
                           handleClose={closeModal} matchup={teamState.matchups}
                           handleAddEvent={handleAddEvent} timerState={timerState}
            />

        </div>
    )
}