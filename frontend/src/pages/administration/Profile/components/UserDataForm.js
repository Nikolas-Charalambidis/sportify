import {Formik} from "formik";
import {ChangeData} from "../../../../api/user/userAPI";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {Field} from "../../../../atoms";
import React from "react";
import * as yup from "yup";

const schemaChangeData = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
});

export function UserDataForm({ api, id_user, handleShow, state}) {

    return (
        <Formik
            validationSchema={schemaChangeData}
            initialValues={{ name: state.user_data.name, surname: state.user_data.surname }}
            onSubmit={values => {
                ChangeData(api, id_user, values);
            }}
        >{({ handleSubmit, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Row>
                    <Col className="d-xl-none text-center mb-5">
                        <Image fluid roundedCircle
                               src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfe80083d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfe80083d%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                    </Col>

                    <Col xl={10} lg={12}>
                        <Row>
                            <Col xl={{span: 6, offset: 0}} lg={{span: 4, offset: 2}} md={{span: 6, offset: 0}}>
                                <Field label="Jméno" name="name" type="text" message="Vyplňte Vaše jméno."
                                       isInvalid={!!errors.name}/>
                            </Col>
                            <Col xl={{span: 6, offset: 0}} lg={{span: 4, offset: 0}} md={{span: 6, offset: 0}}>
                                <Field label="Příjmení" name="surname" type="text"
                                       message="Vyplňte Vaše příjmení." isInvalid={!!errors.surname}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl={{span: 6, offset: 0}} lg={{span: 8, offset: 2}}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control readOnly name="email" defaultValue={state.user_data.email}/>
                            </Col>
                            <Col xl={{span: 3, offset: 0}} lg={{span: 4, offset: 0}}>
                                <Button className="mt4" type="submit" block>
                                    Uložit Profil
                                </Button>
                            </Col>
                            <Col xl={{span: 3, offset: 0}} lg={{span: 4, offset: 0}}>
                                <Button variant="secondary" className="mt4" type="button" block onClick={handleShow}>
                                    Změna hesla
                                </Button>
                            </Col>
                        </Row>
                    </Col>

                    <Col className="d-none d-xl-block">
                        <Image roundedCircle
                               src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfe80083d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfe80083d%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"/>
                    </Col>
                </Row>
            </Form>
        )}
        </Formik>
    )
}