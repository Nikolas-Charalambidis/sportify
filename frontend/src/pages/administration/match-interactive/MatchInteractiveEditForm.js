import React, {useState} from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {NavLink as Link} from "react-router-dom";
import Timer from "react-compound-timer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import {Heading} from "../../../atoms";

export function MatchInteractiveEditForm() {
    const [play, setPlay] = useState(true);

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
                <li className="breadcrumb-item"><span className="active">Interaktivní zápas</span></li>
            </Breadcrumb>

            <Row className="mt-5 mb-3">
                <Col className="text-center">
                    <Heading size="md">{moment().local().format("DD. MM. YYYY HH:mm")}</Heading>
                </Col>
            </Row>
            <Timer initialTime={3599999}
                   direction="backward"
                   startImmediately={true}
                   onResume={() => setPlay(true)}
                   onPause={() => setPlay(false)}>
                {({resume, pause}) => (
                    <React.Fragment>
                        <div>
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
        </div>
    );
}
