import {Button, Form, Modal} from "react-bootstrap";
import {Heading} from "../atoms";
import React from "react";
import {config} from "../config";
import {useState} from "react";

export function UploadAvatar({api, id_user, show, handleClose, type}) {
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState({
        selectedFile: null
    });
    const [formState, setFormState] = useState({
        isLoading: false
    });

    const fileSelectHandler = event => {
        setState({
            selectedFile: event.currentTarget.files[0]
        });
    };

    const fileUploadHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setFormState({isLoading: true});
            let data = new FormData();
            data.append('file', state.selectedFile);
            data.append('id_user', id_user);
            api
                .post(`${config.API_BASE_PATH}/${type}/uploadAvatar`, data)
                .then(({data}) => {
                    setTimeout(() => {window.location.reload();}, 2000);
                    window.flash(data.msg, 'success');
                })
                .catch(({response})  => {
                    const {data} = response;
                    window.flash(data.msg, 'danger');
                });
            handleClose();
        }
        setValidated(true);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className="modal-title">
                    <Heading size="md">Upload avatara</Heading>
                </Modal.Title>
            </Modal.Header>
            {formState.isLoading ? <div>Nahrávám avatara...</div>  :
                    <Form noValidate validated={validated} onSubmit={fileUploadHandler} enctype="multipart/form-data">

                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control required onChange={fileSelectHandler} name="file" type="file"/>
                                <Form.Control.Feedback type="invalid">
                                    Nahrajte prosím svého avatara
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Nahrát avatara
                            </Button>
                            <Button variant="secondary" type="button" onClick={handleClose}>
                                Zavřít
                            </Button>
                        </Modal.Footer>
                    </Form>
            }
        </Modal>
    )
}