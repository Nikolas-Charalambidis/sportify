import React, {useState} from 'react';
import Timer from "react-compound-timer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import {Heading} from "../../../../../atoms";
import {MatchDetailScore} from "../../../public/MatchDetailScore";
import NumericInput from 'react-numeric-input';
import Button from "react-bootstrap/Button";
import { AddGoalSuspensionModal } from "../../base/AddGoalSuspensionModal";

export function MatchInteractiveForm({hostName, guestName, hostState, guestState, setHostState, setGuestState}) {
    const [play, setPlay] = useState(true);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const closeGoalSuspensionModal = () => setShowGoalModal(false);
    /*const openGoalSuspensionModal = (values) => setShowGoalModal({
        show: true,
        selectPlayerManually: selectPlayerManually,
        defaultTab: defaultTab
    });*/

    const openGoalSuspensionModal = (values) => {
        const { selectPlayerManually, defaultTab } = values;  
        setShowGoalModal({
            show: true,
            selectPlayerManually: selectPlayerManually,
            defaultTab: defaultTab
        });
    }

    const handleAddEvent = (values) => {
        const { id_team, matchups, events, shots } = hostState;        
        setHostState({
            id_team: id_team,
            matchups: matchups,
            events: [...events, values],
            shots: shots
        });
        window.flash("Event byl úspěšně přidán", "success")
    };

    return (
        <div>
            <Row className="mt-5 mb-2">
                <Col className="text-center">
                    <Heading size="md">{moment().local().format("DD. MM. YYYY HH:mm")}</Heading>
                </Col>
            </Row>

            <MatchDetailScore hostGoals={2} hostName={hostName} guestGoals={3} guestName={guestName}/>

            <Timer initialTime={3599999}
                   direction="backward"
                   startImmediately={true}
                   onResume={() => setPlay(true)}
                   onPause={() => setPlay(false)}>
                {({resume, pause}) => (
                    <React.Fragment>
                        <div className="mt-4">
                            <div className="clock">
                                <div className="column">
                                    <div className="timer"><Timer.Minutes/></div>
                                    <div className="text">minut</div>
                                </div>

                                <div className="column">
                                    <div className="timer"><Timer.Seconds/></div>
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
                )}
            </Timer>


            <Row className="mt-5 interactiveStats">
                <Col className="bg-white">
                    <Heading size="lg">
                        {hostName}
                        <hr/>
                    </Heading>

                    <Heading className="text-center" size="sm">Počet střel <FontAwesomeIcon className="ml-2" icon={Icons.faMeteor} size="1x"/></Heading>
                    <div className="plusMinusDiv mb-2">
                        <NumericInput
                            className="form-control"
                            value={0}
                            min={0}
                            max={100}
                            step={1}
                            precision={0}
                            mobile
                            strict
                        />
                    </div>

                    <Heading className="text-center mt-5" size="sm">Počet gólů <span
                        className="bgBlack">2</span></Heading>
                    <div className="text-center">
                        <Button variant="primary" onClick={() => openGoalSuspensionModal({ selectPlayerManually: true })}>
                            Přidat gól
                        </Button>
                    </div>

                    <AddGoalSuspensionModal id_team={hostState.id_team} host={1}
                        params={showGoalModal} handleClose={closeGoalSuspensionModal} matchup={hostState.matchups}
                        handleAddEvent={handleAddEvent}/>

                    <Heading className="text-center mt-5" size="sm">Trestných minut <span className="bgBlack">15</span></Heading>
                    <div className="text-center mb-4">
                        <Button variant="primary" onClick={() => openGoalSuspensionModal({ selectPlayerManually: true, defaultTab: "suspension" })}>
                            Přidat trest
                        </Button>
                    </div>
                </Col>

                <Col className="bg-white">
                    <Heading size="lg">
                        {guestName}
                    </Heading>
                </Col>
            </Row>
        </div>
    );
}
