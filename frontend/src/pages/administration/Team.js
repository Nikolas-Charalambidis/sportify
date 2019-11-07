import React from 'react';
import {Heading} from '../../atoms';
import {CardTemplate} from '../../templates/CardTemplate';
import {
    Form,
    Row,
    Col,
    Image,
    Breadcrumb,
} from 'react-bootstrap';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import {useGetTeam} from "../../api/team/teamClient_v1";
import {Formik} from "formik";
import * as yup from 'yup';
import {Field} from "../../atoms/Field";

const schemaChangeData = yup.object().shape({
    name: yup.string().required(),
    sport: yup.string().required(),
});

export function Team() {
    // const history = useHistory();
    // const api = useApi();

    const [state] = useGetTeam(1);

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item href="/administration">Administrace</Breadcrumb.Item>
                <Breadcrumb.Item active>Tým</Breadcrumb.Item>
            </Breadcrumb>
            <Heading className="mt-4 mb-5">Týmový profil</Heading>
            {!state.isLoading &&
            <div>
                <Formik
                    validationSchema={schemaChangeData}
                    initialValues={{
                        name: state.team_data.name,
                        sport: state.team_data.sport
                    }}
                    onSubmit={values => {
                        //useChangeData(api, state.team_data.id_team, values);
                    }}
                >{({handleSubmit, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col className="d-xl-none text-center mb-5">
                                <Image fluid
                                       src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfe80083d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfe80083d%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.875%22%20y%3D%2295.2828125%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                       roundedCircle/>
                            </Col>

                            <Col xl={10} lg={12}>
                                <Row>
                                    <Col xl={{span: 6, offset: 0}} lg={{span: 4, offset: 2}}
                                         md={{span: 6, offset: 0}}>
                                        <Row>
                                            <Col xl={{span: 6, offset: 0}} lg={{span: 4, offset: 2}}
                                                 md={{span: 6, offset: 0}}>
                                                <Field label="Nazev tymu" name="name" type="text"
                                                       message="Vyplnte nazev tymu" isInvalid={!!errors.name}/>
                                            </Col>
                                            <Col xl={{span: 6, offset: 0}} lg={{span: 4, offset: 2}}
                                                 md={{span: 6, offset: 0}}>
                                                <Field label="Sport" name="sport" type="text"
                                                       message="Vyplňte sport, ktery tym hraje"
                                                       isInvalid={!!errors.sport}/>
                                            </Col>
                                            <Col xl={{span: 8, offset: 0}} lg={{span: 4, offset: 0}}>
                                                <Form.Label>Leader</Form.Label>
                                                <Form.Control readOnly name="leader"
                                                              defaultValue={state.team_data.leader}/>
                                            </Col>
                                        </Row>
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
                <h2 className="mt-4">Soutěže</h2>
                <Row>
                    <CardTemplate title="Jarov Liga" subtitle="Pozice: 1." pictureHeader={Icons.faFutbol} tooltipPictureHeader="fotbal"
                                  mainPicture="http://bit.ly/32Z7Hfl" textHeader="Probíhá"/>
                    <CardTemplate title="Extraliga" subtitle="Pozice: 2." pictureHeader={Icons.faFutbol} tooltipPictureHeader=" fotbal"
                                  mainPicture="http://bit.ly/2PrDmSC" textHeader="Ukončena"/>
                </Row>
            </div>
            }
        </div>
    );
}
