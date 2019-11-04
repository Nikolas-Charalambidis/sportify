import {Formik} from "formik";
import {ChangeData} from "../../../../api/user/userClient_v1";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {Field} from "../../../../atoms";
import React, {useState} from "react";
import * as yup from "yup";
import {UploadAvatar} from "../../../../organisms/UploadAvatar";

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
                                : <Image roundedCircle onClick={openAvatarModal}
                                         src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfe80083d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfe80083d%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"/>
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
                                : <Image roundedCircle onClick={openAvatarModal}
                                         src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfe80083d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfe80083d%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"/>
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