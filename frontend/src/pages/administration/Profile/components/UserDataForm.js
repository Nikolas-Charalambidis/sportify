import {Formik} from "formik";
import {ChangeData} from "../../../../api/user/userClient_v1";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Field} from "../../../../atoms";
import React from "react";
import * as yup from "yup";
import {Avatar} from "../../../../organisms/Avatar";
import defaultLogoAvatar from "../../../../assets/images/default_avatar.svg";
import {useState} from "react";

const schemaChangeData = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
});

export function UserDataForm({api, handleShow, state}) {
    let new_url = state.user_data.avatar_url === null ? defaultLogoAvatar : state.user_data.avatar_url;
    const [imageState, setImageState] = useState(new_url);
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
                            <Avatar api={api} setImageState={setImageState} imageState={imageState} type={"users"}
                                    id={state.user_data.id_user}/>
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
                            <Avatar api={api} setImageState={setImageState} imageState={imageState} type={"users"}
                                    id={state.user_data.id_user}/>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
        </div>
    );
}