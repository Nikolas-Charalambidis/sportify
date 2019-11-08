import React, {useState} from 'react';
import {Field, Heading} from '../../../atoms';
import {Breadcrumb, Button, Col, Form, Row} from 'react-bootstrap';
import {NavLink as Link, useParams} from "react-router-dom";
import {useGetTeam} from "../../../api/team/teamClient_v1";
import {useApi} from "../../../hooks/useApi";
import {Formik} from "formik";
import {ChangeTeamData} from "../../../api/team/teamClient_v1";
import * as yup from "yup";
import {useGetMembers} from "../../../api/team/teamClient_v1";
import defaultLogoAvatar from "../../../assets/images/default_team_avatar.jpg";
import '../../../assets/sass/pages/_teamAdmin.scss';
import { Avatar } from "../../../organisms/Avatar";

const schemaChangeData = yup.object().shape({
    name: yup.string().required(),
    id_sport: yup.string().required(),
    type: yup.string().required(),
    id_contact_person: yup.string().required(),
});

function getAvatarUrl(state) {    
    if (state) {
        try {
            return state.team_data.avatar;
        } catch (e) {
            return defaultLogoAvatar;
        }       
    }
};

export function TeamAdminPage() {

    const { id_team } = useParams();
    const [state] = useGetTeam(id_team);
    const [membersState] = useGetMembers(id_team);
    const api = useApi();
    const new_url = getAvatarUrl(state);
    const [imageState, setImageState] = useState(new_url);
    console.log(state);
    return (
        <div>
            {state.isLoading && <div>Načítám data...</div>}
            {(!state.isLoading && state.error) && <div>Data se nepodařilo načíst</div>}
            {!state.isLoading &&
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
                <li className="breadcrumb-item"><Link to="/administration/teams">Moje týmy</Link></li>
                <li className="breadcrumb-item"><span className="active">{state.team_data.name}</span></li>
            </Breadcrumb>
            }
            <div>
                {state.isLoading && membersState.isLoading && <div>Načítám data...</div>}
                {(!state.isLoading && state.error && !membersState.isLoading && membersState.error) && <div>Data se nepodařilo načíst</div>}
                {!state.isLoading && !membersState.isLoading &&                   
                    <Formik
                    initialValues={{
                        name: state.team_data.name, type: state.team_data.type, sport: state.team_data.sport, id_sport: state.team_data.id_sport, id_contact_person: state.team_data.id_leader }}
                    validationSchema={schemaChangeData}
                    onSubmit={values => {
                        console.log(values);
                        ChangeTeamData(api, state.team_data.id_team, values);
                    }}
                    >{({handleSubmit}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Heading className="pageHeading mt-4 mb-5">{state.team_data.name}</Heading>
                        <Row>
                            <Col xl={10} lg={10}>
                                <Row>
                                    <Col sm={{span: 6, offset: 0}}>
                                        <Field label="Nazev" name="name" type="text"
                                                message="Vyplňte tymove jméno."/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={{span: 4, offset: 0}}>
                                        <Field as="select" name="type">
                                            <option value="profi">Profesionální</option>
                                            <option value="amatéři">Amatérský</option>
                                        </Field>
                                        <Field as="select" name="id_contact_person">
                                                {membersState.team_data.map((anObjectMapped) => (
                                                    <option key={anObjectMapped.id_user} value={anObjectMapped.id_user}>{anObjectMapped.name + " " + anObjectMapped.surname}</option>                                                        
                                                ))}
                                        </Field>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={{span: 4, offset: 0}}>
                                        <Field as="select" name="id_sport">
                                            <option value="3">Hokejbal</option>
                                            <option value="1">Hokej</option>
                                            <option value="2">Florbal</option>
                                        </Field>
                                    </Col>
                                    <Col className="d-flex align-items-end mb-3 mt-lg-0" xl={{span: 3, offset: 0}}
                                            lg={{span: 3, offset: 0}}>
                                        <Button type="submit" block>
                                            Uložit
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={2} lg={2} className="avatar-container">
                                <Avatar api={api} setImageState={setImageState} imageState={imageState} type={"teams"}
                                    id={state.team_data.id_team} />
                            </Col>
                        </Row>
                    </Form>
                )}
                </Formik>
                }
            </div>
        </div>
    );
}
