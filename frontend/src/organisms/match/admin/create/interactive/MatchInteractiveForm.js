import React, { useState } from 'react';
import Timer from "react-compound-timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Heading } from "../../../../../basicComponents";
import { MatchDetailScore } from "../../../public/MatchDetailScore";
import Button from "react-bootstrap/Button";
import { MatchInteractiveTeamTab } from "./MatchInteractiveTeamTab";
import { Events } from "../../base/Events";
import { Modal } from "react-bootstrap";

function getPeriod(time, pause, stringPeriod, firstPeriodPause, setFirstPeriodPause, secondPeriodPause, setSecondPeriodPause, thirdPeriodPause, setThirdPeriodPause, setShowModal) {
    console.log(time, firstPeriodPause, secondPeriodPause, thirdPeriodPause);
    if (Math.trunc(time) < 2401000 && !firstPeriodPause) {
        setFirstPeriodPause(true);
        setShowModal(true);
        pause();        
    };

    if (Math.trunc(time) < 1201000 && !secondPeriodPause) {
        setSecondPeriodPause(true);
        setShowModal(true);
        pause();
    };

    if (Math.trunc(time) < 1000 && !thirdPeriodPause) {
        setThirdPeriodPause(true);
        setShowModal(true);
        pause();
    };

    if (stringPeriod === "Prodloužení") {
        return "Prodloužení";
    };

    return stringPeriod + ". třetina";
};

export function MatchInteractiveForm({ hostName, guestName, hostState, guestState, setHostState, setGuestState, handleCreateMatch }) {
    const [play, setPlay] = useState(true);

    const [stringPeriod, setStringPeriod] = useState(1);
    const [firstPeriodPause, setFirstPeriodPause] = useState(false);
    const [secondPeriodPause, setSecondPeriodPause] = useState(false);
    const [thirdPeriodPause, setThirdPeriodPause] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
        if (stringPeriod === 3) {
            setStringPeriod("Prodloužení");
        } else {
            setStringPeriod(stringPeriod + 1);
        }        
    };

    return (

        <Timer initialTime={3599999}
            direction="backward"
            startImmediately={true}
            onResume={() => setPlay(true)}
            onPause={() => setPlay(false)}
        >{({ resume, pause, getTime }) => (
            <div>
                <React.Fragment>
                    <div className="mt-4">
                        <div className="clock">
                            <div className="column">
                                <div className="timer">
                                    <Timer.Minutes />
                                </div>
                            </div>
                            <div className="column">
                                <div className="timer">
                                    <Timer.Seconds />
                                </div>
                            </div>
                        </div>
                    </div>

                        <div className="text-center">
                            <label>{getPeriod(getTime(), pause, stringPeriod, firstPeriodPause, setFirstPeriodPause, secondPeriodPause, setSecondPeriodPause, thirdPeriodPause, setThirdPeriodPause, setShowModal)}</label>
                    </div>

                    <div className="text-center timerButtons">
                        <button className={!play ? 'btn btn-pause active' : 'btn btn-pause'}
                            onClick={pause}><FontAwesomeIcon icon={Icons.faPause} size="2x" /></button>
                        <button className={play ? 'btn btn-play active' : 'btn btn-play'}
                            onClick={resume}><FontAwesomeIcon icon={Icons.faPlay} size="2x" /></button>
                    </div>
                </React.Fragment>

                <MatchDetailScore hostGoals={hostState.events.filter(g => g.type === "goal").length} hostName={hostName} guestGoals={guestState.events.filter(g => g.type === "goal").length} guestName={guestName} />

                {() => getTime() - 3600000 / 1000 / 60}
                <Row className="mt-3 interactiveStats">
                    <Col className="bg-white">
                        <MatchInteractiveTeamTab teamName={hostName} teamState={hostState} teamSetState={setHostState}
                            setPlay={setPlay} timerState={getTime()} pauseMatchOnEvent={pause} />
                    </Col>

                    <Col className="bg-white">
                        <MatchInteractiveTeamTab teamName={guestName} teamState={guestState} teamSetState={setGuestState}
                            setPlay={setPlay} timerState={getTime()} pauseMatchOnEvent={pause} />
                    </Col>
                </Row>

                <Heading size="lg" className="mt-5 h3MatchDetail text-left">Události domácí</Heading>
                <Events type="create" eventsState={hostState} fetchEvents={setHostState} />

                <Heading size="lg" className="mt-5 h3MatchDetail text-left">Události hosté</Heading>
                <Events type="create" eventsState={guestState} fetchEvents={setGuestState} />

                <Button className="mt-3 float-right" variant="primary" onClick={handleCreateMatch}>
                    Vytvořit zápas
                </Button>

                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header>
                            <Modal.Title className="modal-title">
                                <Heading size="md">Konec třetiny</Heading>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Skončila {stringPeriod}. třetina
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" type="button" onClick={closeModal}>Ok</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )}
        </Timer>
    );
}
