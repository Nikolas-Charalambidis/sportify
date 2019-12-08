import {Heading} from "../../../../../atoms";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import NumericInput from "react-numeric-input";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {AddEventModal} from "./AddEventModal";


export function MatchInteractiveTeamTab({ teamName, teamState, teamSetState, setPlay, timerState, pauseMatchOnEvent}) {
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