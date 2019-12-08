import React from "react";
import {Button, Modal} from "react-bootstrap";
import {CustomSelect} from "../atoms/Select";


export function TeamRequestModal ({show, handleClose, positions, positionsState, setPositionsState}) {

    return (
        <Modal show={show}>

            <Modal.Body>
                <CustomSelect name="id_position" label="Vyberte pozici" options={positions}
                              getOptionLabel={option => `${option.position}`}
                              getOptionValue={option => `${option.id_position}`}
                              placeholder="Vyberte pozici"
                              onChange={option => {
                                  setPositionsState({
                                      id_positions: option.id_position,
                                  });
                              }}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={console.log("set", positionsState)}>
                    Odeslat žádost
                </Button>
                <Button variant="secondary" type="button" onClick={handleClose}>
                    Zrušit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}