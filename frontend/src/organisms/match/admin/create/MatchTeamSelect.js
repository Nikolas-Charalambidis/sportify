import React, {useState} from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CustomSelect } from '../../../../basicComponents/Select';
import {Heading} from "../../../../basicComponents";
import {getTeamAdmin} from "../../../../api/teamClient_v1";
import {useAuth} from "../../../../utils/auth";
import {useApi} from "../../../../hooks/useApi";

const schema = yup.object().shape({
    id_team_home: yup.string().required(),
    id_team_visiting: yup.number().required(),
});

export function MatchTeamSelect({teams, setHostState, setGuestState, setDisplay}) {
    const {user} = useAuth();
    const api = useApi();

    const [host, setHostSelected] = useState(false);
    const [guest, setGuestSelected] = useState(false);

    const [isValidated, setIsValidated] = useState(true);

    const checkTeamsAdmins = async (host, guest) => {
        if(host && guest) {
            const hostData = await getTeamAdmin(api, host);
            const guestData = await getTeamAdmin(api, guest);

            if(!hostData || !guestData){
                setIsValidated(false);
                setDisplay(false);
                window.flash("Vedoucí týmů se nepodařilo ověřit!", 'danger');
                return;
            }

            if(user.id_user === hostData || user.id_user === guestData){
                setIsValidated(true);
                setDisplay(true);
                setHostState({
                    id_team: host,
                    matchups: [],
                    events: [],
                    shots: 0
                });
                setGuestState({
                    id_team: guest,
                    matchups: [],
                    events: [],
                    shots: 0
                });
            } else {
                setIsValidated(false);
                setDisplay(false);
            }
        }
    };

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={values =>  () => {}}
            >{() => (
                <Form noValidate>
                    <Row>
                        <Col sm={{ span: 6, offset: 0 }}>
                            <CustomSelect
                                label="Domácí"
                                name="id_team_home"
                                options={teams}
                                getOptionLabel={option => `${option.name}`}
                                getOptionValue={option => `${option.id_team}`}
                                placeholder="Vyberte tým domácích"
                                onChange={option => {
                                    setHostSelected(option.id_team);
                                    checkTeamsAdmins(option.id_team, guest).then();
                                }}
                                isSearchable={true}
                            />
                        </Col>
                        <Col sm={{ span: 6, offset: 0 }}>
                            <CustomSelect
                                label="Hosté"
                                name="id_team_visiting"
                                options={teams}
                                getOptionLabel={option => `${option.name}`}
                                getOptionValue={option => `${option.id_team}`}
                                placeholder="Vyberte tým hostů"
                                onChange={option => {
                                    setGuestSelected(option.id_team);
                                    checkTeamsAdmins(host, option.id_team).then();
                                }}
                                isSearchable={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ span: 12, offset: 0 }}>

                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
            {!isValidated && <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Musíte být vedoucím alespoň jednoho z týmů!</Heading>}
        </div>
    );
}
