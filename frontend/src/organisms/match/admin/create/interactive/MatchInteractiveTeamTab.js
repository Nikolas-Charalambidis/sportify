import {Heading} from "../../../../../atoms";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import NumericInput from "react-numeric-input";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {AddEventModal} from "./AddEventModal";


export function MatchInteractiveTeamTab({teamName, teamState, teamSetState, setPlay, timerState}) {
    const handleAddEvent = (values) => {
        const { id_team, matchups, events, shots } = teamState;
        teamSetState({
            id_team: id_team,
            matchups: matchups,
            events: [...events, values],
            shots: shots
        });
        window.flash("Event byl úspěšně přidán", "success")
        closeModal();
        setPlay(true);
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
                <NumericInput
                    className="form-control"
                    value={teamState.shots}
                    min={0}
                    max={100}
                    step={1}
                    precision={0}
                    mobile
                    strict
                />
            </div>

            <Heading className="text-center mt-5" size="sm">
                Počet gólů <span className="bgBlack">2</span>
            </Heading>
            <div className="text-center">
                <Button variant="primary" onClick={() => {
                    setPlay(false);
                    openModal("goal");
                }}>
                    Přidat gól
                </Button>
            </div>

            <Heading className="text-center mt-5" size="sm">
                Trestných minut <span className="bgBlack">15</span>
            </Heading>
            <div className="text-center mb-4">
                <Button variant="primary" onClick={() => {
                    setPlay(false);
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