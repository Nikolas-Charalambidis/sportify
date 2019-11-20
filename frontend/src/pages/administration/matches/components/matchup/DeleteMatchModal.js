import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {Heading} from "../../../../../atoms";
import {deleteMatch} from "../../../../../api/matches/matchClient_v1";

export function DeleteMatchModal({show, api, history, id_team, id_match, handleClose}) {

    const handleDeleteMatch = async () => {
        handleClose();
        const result = await deleteMatch(api, id_match);
        if(result){
            history.replace(`/administration/teams/${id_team}`);
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title className="modal-title">
                    <Heading size="md">Delete zápasu</Heading>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Opravdu si přejete odstranit zápas?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" type="button" onClick={handleDeleteMatch}>
                    Odstranit
                </Button>
                <Button variant="secondary" type="button" onClick={handleClose}>
                    Zrušit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
