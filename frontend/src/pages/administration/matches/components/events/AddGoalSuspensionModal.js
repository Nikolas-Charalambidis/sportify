import React from 'react';
import {Modal, Tab, Tabs} from "react-bootstrap";
import {Heading} from "../../../../../atoms";
import {useApi} from "../../../../../hooks/useApi";
import * as yup from "yup";
import {AddGoalForm} from "./AddGoalForm";
import {AddSuspensionForm} from "./AddSuspensionForm";
import {addEvent} from "../../../../../api/events/eventClient_v1";

const schema = yup.object().shape({
    id_user: yup.number().required(),
    type: yup.string().required(),
    id_team: yup.number().required(),
    id_match: yup.number().required(),
    id_assistance1: yup.number().nullable(),
    id_assistance2: yup.number().nullable(),
    minute: yup.number().integer().min(1).max(60).required(),
    value: yup.number().required(),
    host: yup.number().required(),
});

export function AddGoalSuspensionModal({params, handleClose, fetchEvents, matchup, id_team, id_match, host}) {
    const {show, id_user} = params;
    const api = useApi();

    const handleAddEvent = async (values) => {
        const result = await addEvent(api, values);
        if(result) {
            fetchEvents();
        }
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
                                         id_team={id_team} id_match={id_match} host={host} schema={schema} />
                        </Tab>
                        <Tab eventKey="suspension" title="Přidat trest">
                            <AddSuspensionForm id_user={id_user} handleClose={handleClose} addEvent={handleAddEvent}
                                         id_team={id_team} id_match={id_match} host={host}  schema={schema} />
                        </Tab>
                    </Tabs>
        </Modal>
    );
}
