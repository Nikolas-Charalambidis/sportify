import React, {useState} from 'react';
import Timer from "react-compound-timer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import {Heading} from "../../../../../atoms";
import {MatchDetailScore} from "../../../public/MatchDetailScore";
import Button from "react-bootstrap/Button";
import {MatchInteractiveTeamTab} from "./MatchInteractiveTeamTab";
// import { useCreateMatch } from "../../../../../api/matchClient_v1";

export function MatchInteractiveForm({hostName, guestName, hostState, guestState, setHostState, setGuestState}) {
    const [play, setPlay] = useState(true);

    return (
        <Timer initialTime={3599999}
               direction="backward"
               startImmediately={true}
               onResume={() => setPlay(true)}
               onPause={() => setPlay(false)}
        >{({resume, pause, getTime }) => (
            <div>
                <Row className="mt-5 mb-2">
                    <Col className="text-center">
                        <Heading size="md">{moment().local().format("DD. MM. YYYY HH:mm")}</Heading>
                    </Col>
                </Row>

                <MatchDetailScore hostGoals={2} hostName={hostName} guestGoals={3} guestName={guestName}/>

                <React.Fragment>
                    <div className="mt-4">
                        <div className="clock">
                            <div className="column">
                                <div className="timer">
                                    <Timer.Minutes/>
                                </div>
                                <div className="text">minut</div>
                            </div>
                            <div className="column">
                                <div className="timer">
                                    <Timer.Seconds/>
                                </div>
                                <div className="text">sekund</div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center timerButtons">
                        <button className={!play ? 'btn btn-pause active' : 'btn btn-pause'}
                                onClick={pause}><FontAwesomeIcon icon={Icons.faPause} size="2x"/></button>
                        <button className={play ? 'btn btn-play active' : 'btn btn-play'}
                                onClick={resume}><FontAwesomeIcon icon={Icons.faPlay} size="2x"/></button>
                    </div>
                </React.Fragment>
                {() => getTime() - 3600000 / 1000 / 60}
                <Row className="mt-5 interactiveStats">
                    <Col className="bg-white">
                        <MatchInteractiveTeamTab teamName={hostName} teamState={hostState} teamSetState={setHostState}
                                                 setPlay={setPlay} />
                    </Col>

                    <Col className="bg-white">
                        <MatchInteractiveTeamTab teamName={guestName} teamState={guestState} teamSetState={setGuestState}
                                                 setPlay={setPlay}  />
                    </Col>
                </Row>

                <Button variant="primary" onClick={() => console.log(hostState, guestState)}>
                    Vytvořit zápas
                </Button>
            </div>
        )}
        </Timer>
    );
}
