import React from 'react';
import {Modal, Tab, Tabs} from "react-bootstrap";
import {Heading} from "../../../../../atoms";
import * as yup from "yup";
import { AddGoalForm } from "../../../../../organisms/match/admin/events/AddGoalForm";
import { AddSuspensionForm } from "../../../../../organisms/match/admin/events/AddSuspensionForm";
import { AddShotForm } from "./AddShotForm";

const schema = yup.object().shape({
    id_user: yup.number().integer().required(),
    type: yup.string().required(),
    id_team: yup.number().integer().required(),
    id_match: yup.number().integer().nullable(),
    id_assistance1: yup.number().integer().nullable(),
    id_assistance2: yup.number().integer().nullable(),
    minute: yup.number().integer().min(1).max(60).required(),
    value: yup.number().nullable(),
    host: yup.boolean().required(),
});

export function AddGoalSuspensionModal({params, handleClose, matchup, id_team, events, setEvent, host }) {
    const { show, id_user } = params;

    const handleAddEvent = async (values) => {
        setEvent([...events, values]);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className="modal-title">
                    <Heading size="md">Přidat event</Heading>
                </Modal.Title>
            </Modal.Header>

            <Tabs className="mb-3" fill defaultActiveKey="goal" id="teamTabs">
                <Tab eventKey="goal" title="Přidat gól">
                    <AddGoalForm id_user={id_user} handleClose={handleClose} matchup={matchup} addEvent={handleAddEvent}
                        id_team={id_team} schema={schema} host={host} id_match={null} />
                </Tab>
                <Tab eventKey="suspension" title="Přidat trest">
                    <AddSuspensionForm id_user={id_user} handleClose={handleClose} addEvent={handleAddEvent}
                        id_team={id_team} schema={schema} host={host} id_match={null} />
                </Tab>
                <Tab eventKey="shots" title="Přidat strely">
                    <AddShotForm id_user={id_user} handleClose={handleClose} addEvent={handleAddEvent}
                                       id_team={id_team} schema={schema} host={host} />
                </Tab>
            </Tabs>
        </Modal>
    );
}
