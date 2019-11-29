import React, {useState} from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {NavLink as Link} from "react-router-dom";
import Timer from "react-compound-timer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

export function MatchInteractiveEditForm() {
    const [timer, setTimer] = useState('play');

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
                <li className="breadcrumb-item"><span className="active">Interaktivní zápas</span></li>
            </Breadcrumb>

            <Timer initialTime={55000}
                   direction="backward"
                   startImmediately={true}
                   onResume={() => setTimer('play')}
                   onPause={() => setTimer('pause')}>
                {({resume, pause}) => (
                    <React.Fragment>
                        <div className="mt-5">
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
                            <button className={timer === 'pause' ? 'btn btn-pause active' : 'btn btn-pause'}
                                    onClick={pause}><FontAwesomeIcon icon={Icons.faPause} size="2x"/></button>
                            <button className={timer === 'play' ? 'btn btn-play active' : 'btn btn-play'}
                                    onClick={resume}><FontAwesomeIcon icon={Icons.faPlay} size="2x"/></button>
                        </div>
                    </React.Fragment>
                )}
            </Timer>
        </div>
    );
}
