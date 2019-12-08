import React from "react";
import {Button, Modal} from "react-bootstrap";

export function UpdateStateModal ({show, handleClose, updateFunction, deleteFunction, idItem, status, idButton}) {

    const updateItem = () => {
        handleClose();
        if (idButton === "remove") {
            deleteFunction(idItem);
        } else {
            updateFunction(idItem);
        }

    };
    return (
        <Modal show={show}>

            <Modal.Body>
                {status === "active" && <p>Opravdu si přejete odstranit hráče ze soupisky?</p>}
                {status === "inactive" && <p>Opravdu si přejete přidat hráče na soupisku aktivních hráčů?</p>}
                {(status === "pending" && idButton === "active") && <p>Opravdu si přejete schválit žádost hráče a zařadit ho na soupisku?</p>}
                {(status === "pending" && idButton === "declined") && <p>Opravdu si přejete zamítnou žádost hráče o zařazení na soupisku?</p>}
                {status === "declined" && <p>Opravdu si přejete zařadit hráče odstranit ze seznamu zamítnutých žádostí?</p>}
            </Modal.Body>

            <Modal.Footer>
                {status === "active" && <Button variant="danger" type="button" onClick={updateItem}>Odstranit</Button>}
                {status === "inactive" && <Button variant="primary" type="button" onClick={updateItem}>Přidat</Button>}
                {(status === "pending" && idButton === "active")  && <Button variant="primary" type="button" onClick={updateItem}>Schválit</Button>}
                {(status === "pending" && idButton === "declined") && <Button variant="danger" type="button" onClick={updateItem}>Zamítnout</Button>}
                {status === "declined" && <Button variant="danger" type="button" onClick={updateItem}>Odstranit</Button>}
                <Button variant="secondary" type="button" onClick={handleClose}>
                    Zrušit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}