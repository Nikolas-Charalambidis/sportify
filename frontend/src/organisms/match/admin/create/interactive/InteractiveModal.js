import React from 'react';
import { Modal } from "react-bootstrap";
import { Heading } from "../../../../../basicComponents";
import Button from "react-bootstrap/Button";

export function InteractiveModal({ showModal, closeModal, handleCreateMatch, heading, bodyText, period, closeButtonText }) {

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title className="modal-title">
                    <Heading size="md">{heading}</Heading>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {period}{bodyText}
            </Modal.Body>

            <Modal.Footer>
                {handleCreateMatch &&
                    <Button variant="primary" type="button" onClick={handleCreateMatch}>Vytvořit zápas</Button>
                }

                <Button variant="secondary" type="button" onClick={closeModal}>{closeButtonText}</Button>
            </Modal.Footer>
        </Modal>
    );
}
