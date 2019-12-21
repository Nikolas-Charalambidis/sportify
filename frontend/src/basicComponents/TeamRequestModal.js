import React from "react";
import {Button, Modal} from "react-bootstrap";
import {CustomSelect} from ".//Select";
import {addNewMember} from "../api/teamMembershipClient_v1";
import {useApi} from "../hooks/useApi";


export function TeamRequestModal ({show, handleClose, positions, positionsState, setPositionsState, id_team, id_user}) {

const api = useApi();

    return (
        <Modal show={show}>

            <Modal.Body>
                <CustomSelect name="id_position" label="Vyberte pozici" options={positions}
                              getOptionLabel={option => `${option.position}`}
                              getOptionValue={option => `${option.id_position}`}
                              placeholder="Vyberte pozici"
                              onChange={option => {
                                  setPositionsState({
                                      id_position: option.id_position,
                                  });
                              }}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={async () => {
                    await addNewMember(api, id_team, id_user, positionsState.id_position, "pending");
                    handleClose();
                }}>
                    Odeslat žádost
                </Button>
                <Button variant="secondary" type="button" onClick={handleClose}>
                    Zrušit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}