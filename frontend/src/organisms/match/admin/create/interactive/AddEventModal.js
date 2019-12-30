import React from 'react';
import { Modal } from "react-bootstrap";
import { Heading } from "../../../../../basicComponents";
import * as yup from "yup";
import { AddGoalForm } from "./../../base/AddGoalForm";
import { AddSuspensionForm } from "./../../base/AddSuspensionForm";

const schema = yup.object().shape({
    id_user: yup.number().integer().required(),
    name: yup.string(),
    type: yup.string().required(),
    id_team: yup.number().integer().required(),
    id_assistance1: yup.number().integer().nullable(),
    name_assistance1: yup.string(),
    id_assistance2: yup.number().integer().nullable(),
    name_assistance2: yup.string(),
    minute: yup.number().integer().min(1).max(60).required(),
    value: yup.number().nullable(),
    host: yup.number().required(),
});

export function AddEventModal({ params, handleClose, matchup, id_team, id_match, host, handleAddEvent, timerState }) {
    const { show, id_user, type } = params;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className="modal-title">
                    <Heading size="md">Přidat event</Heading>
                </Modal.Title>
            </Modal.Header>

            {type === "goal" &&
                <AddGoalForm id_user={id_user} handleClose={handleClose} matchup={matchup} addEvent={handleAddEvent}
                    id_team={id_team} id_match={id_match} host={host} schema={schema} interactive={true}
                    timerState={timerState} />
            }
            {type === "suspension" &&
                <AddSuspensionForm id_user={id_user} handleClose={handleClose} matchup={matchup} addEvent={handleAddEvent}
                id_team={id_team} id_match={id_match} host={host} schema={schema} interactive={true}
                timerState={timerState} />
            }
        </Modal>
    );
}
