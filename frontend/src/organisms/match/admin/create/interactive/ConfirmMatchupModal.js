import React from 'react';
import { Modal } from "react-bootstrap";
import { Heading } from "../../../../../basicComponents";
import Button from "react-bootstrap/Button";

export function ConfirmMatchupModal({show, handleClose, setMatchupSelected}) {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className="modal-title">
                    <Heading size="md">Potvrzení sestavy</Heading>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Opravdu si přejete potvrdit sestavu? V interaktivním formuláři nebude možné ji změnit. Změny bude možné provést až v editačním formuláři po uložení zápasu</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={() => {
                    handleClose();
                    setMatchupSelected(true);
                }}>
                    Potvrdit sestavu
                </Button>
                <Button variant="secondary" type="button" onClick={handleClose}>
                    Zavřít
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
