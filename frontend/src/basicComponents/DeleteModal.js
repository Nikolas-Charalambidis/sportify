import React from "react";
import {Button, Modal} from "react-bootstrap";
import {Heading} from "./Heading";


export function DeleteModal ({show, heading, text, handleClose, deleteFunction, idItem}) {

    const deleteItem = () => {
        handleClose();
        deleteFunction(idItem);
    };

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title className="modal-title">
                    <Heading size="md">{heading}</Heading>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{text}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" type="button" onClick={deleteItem}>
                    Odstranit
                </Button>
                <Button variant="secondary" type="button" onClick={handleClose}>
                    Zrušit
                </Button>
            </Modal.Footer>
        </Modal>
    )
};