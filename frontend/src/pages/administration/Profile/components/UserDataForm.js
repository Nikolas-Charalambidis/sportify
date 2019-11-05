import {Formik} from "formik";
import {ChangeData} from "../../../../api/user/userClient_v1";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {Field} from "../../../../atoms";
import React, {useState} from "react";
import * as yup from "yup";
import {UploadAvatar} from "../../../../organisms/UploadAvatar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import defaultLogoAvatar from "../../../../assets/images/default_avatar.svg";

const schemaChangeData = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
});

export function UserDataForm({api, handleShow, state}) {
    const [showModal, setShowModal] = useState(false);
    const openAvatarModal = () => setShowModal(true);
    const closeAvatarModal = () => setShowModal(false);

    return (
        <div>
            <Formik
                validationSchema={schemaChangeData}
                initialValues={{name: state.user_data.name, surname: state.user_data.surname}}
                onSubmit={values => {
                    ChangeData(api, state.user_data.id_user, values);
                }}
            >{({handleSubmit, errors}) => (

                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col className="d-lg-none text-center mb-5">
                            {state.user_data.avatar_url
                                ? <Image roundedCircle onClick={openAvatarModal} src={state.user_data.avatar_url}/>
                                : <div className="avatar-upload">
                                    <div className="avatar-preview">
                                        <div id="imagePreview">
                                            <div className="avatar-edit">
                                                <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg"/>
                                                <label htmlFor="imageUpload"><FontAwesomeIcon icon={Icons.faCamera}/></label>
                                            </div>
                                            <Image roundedCircle src={defaultLogoAvatar}/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Col>
                        <Col xl={10} lg={10}>
                            <Row>
                                <Col sm={{span: 6, offset: 0}}>
                                    <Field label="Jméno" name="name" type="text" message="Vyplňte Vaše jméno."
                                           isInvalid={!!errors.name}/>
                                </Col>
                                <Col sm={{span: 6, offset: 0}}>
                                    <Field label="Příjmení" name="surname" type="text"
                                           message="Vyplňte Vaše příjmení." isInvalid={!!errors.surname}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={{span: 6, offset: 0}} lg={{span: 6, offset: 0}}>
                                    <Field label="Email" name="email" type="email" defaultValue={state.user_data.email}
                                           disabled/>
                                </Col>
                                <Col className="d-flex align-items-end mb-3 mt-lg-0" xl={{span: 3, offset: 0}}
                                     lg={{span: 3, offset: 0}}>
                                    <Button type="submit" block>
                                        Uložit
                                    </Button>
                                </Col>
                                <Col className="d-flex align-items-end mb-3 mt-lg-0" xl={{span: 3, offset: 0}}
                                     lg={{span: 3, offset: 0}}>
                                    <Button variant="secondary" type="button" block
                                            onClick={handleShow}>
                                        Změna hesla
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={2} lg={2} className="d-none d-lg-block">
                            {state.user_data.avatar_url
                                ? <Image roundedCircle onClick={openAvatarModal} src={state.user_data.avatar_url}/>
                                : <div className="avatar-upload">
                                    <div className="avatar-edit">
                                        <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg"/>
                                        <label htmlFor="imageUpload"><FontAwesomeIcon icon={Icons.faCamera}/></label>
                                    </div>
                                    <div className="avatar-preview">
                                        <div id="imagePreview">
                                            <Image roundedCircle src={defaultLogoAvatar}/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
            <UploadAvatar api={api} id_user={state.user_data.id_user} show={showModal} handleClose={closeAvatarModal}
                          type={"users"}/>
        </div>
    );
}