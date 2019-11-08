import React, {useState} from 'react';
import {Field, Heading} from '../../../atoms';
import {Breadcrumb, Button, Col, Form, Image, Row} from 'react-bootstrap';
import {NavLink as Link, useParams} from "react-router-dom";
import {useGetTeam} from "../../../api/team/teamClient_v1";
import {useApi} from "../../../hooks/useApi";
import {Formik} from "formik";
import {ChangeTeamData} from "../../../api/team/teamClient_v1";
import * as yup from "yup";
import {useGetMembers} from "../../../api/team/teamClient_v1";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import defaultLogoAvatar from "../../../assets/images/default_avatar.svg";
import '../../../assets/sass/pages/_teamAdmin.scss';

const schemaChangeData = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
});

export function TeamAdminPage() {
    let {id_team} = useParams();
    const [state] = useGetTeam(id_team);
    const [membersState] = useGetMembers(id_team);
    const api = useApi();
    const [setShowModal] = useState(false);
    const openAvatarModal = () => setShowModal(true);

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
                {state.isLoading && <div>Načítám data...</div>}
                {(!state.isLoading && state.error) && <div>Data se nepodařilo načíst</div>}
                {!state.isLoading &&
                <div>
                    {membersState.isLoading && <div>Načítám data...</div>}
                    {(!membersState.isLoading && membersState.error) && <div>Data se nepodařilo načíst</div>}
                    {!membersState.isLoading &&
                    <Formik
                        initialValues={{type: state.team_data.type, sport: state.team_data.sport, leader: state.team_data.leader}}
                        validationSchema={schemaChangeData}
                        onSubmit={values => {
                            ChangeTeamData(api, state.team_data.id_team, values);
                        }}
                    >{({handleSubmit}) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Heading className="pageHeading mt-4 mb-5">{state.team_data.name}</Heading>
                            <Row>
                                <Col className="d-lg-none text-center mb-5">
                                    {state.team_data.avatar_url
                                        ? <Image roundedCircle onClick={openAvatarModal} src={state.team_data.avatar_url}/>
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
                                            <Field label="Nazev" name="name" type="text"
                                                   message="Vyplňte tymove jméno." defaultValue={state.team_data.name}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={{span: 4, offset: 0}}>
                                            <Field as="select" name="type">
                                                <option value="profi">profi</option>
                                                <option value="amatéři">amatéři</option>
                                            </Field>
                                            <Field as="select" name="leader">
                                                <option value={state.team_data.leader}>{state.team_data.leader}</option>
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={{span: 4, offset: 0}}>
                                            <Field as="select" name="sport">
                                                <option value="hokejbal">hokejbal</option>
                                                <option value="hokej">hokej</option>
                                                <option value="florbal">florbal</option>
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
                                        {state.team_data.avatar_url
                                            ? <Image roundedCircle onClick={openAvatarModal} src={state.team_data.avatar_url} />
                                            : <div className="avatar-upload">
                                                <div className="avatar-edit">
                                                    <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                                                    <label htmlFor="imageUpload"><FontAwesomeIcon icon={Icons.faCamera} /></label>
                                                </div>
                                                <div className="avatar-preview">
                                                    <div id="imagePreview">
                                                        <Image roundedCircle src={defaultLogoAvatar} />
                                                    </div>
                                                </div>
                                            </div>
                                        }                                   
                                </Col>
                            </Row>
                        </Form>
                    )}
                    </Formik>
                    }
                </div>
                }
            </div>
        </div>
    );
}
