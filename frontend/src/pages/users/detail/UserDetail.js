import React from 'react';
import {Heading} from '../../../atoms';
import {Breadcrumb, Row, Col, Image} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {useGetUser} from '../../../api/user/userClient_v1';
import {NavLink as Link} from 'react-router-dom';
import defaultAvatar from "../../../assets/images/default_avatar.svg";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {UserCompetitions} from "./components/UserCompetitions";
import {UserTeams} from "./components/UserTeams";

function getUser(state) {
    if (state) {
        return state.user_data;
    }
}

export function UserDetail() {
    let {id_user} = useParams();
    const [state] = useGetUser(id_user);
    const user = getUser(state);

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><span className="active">Uživatelé</span></li>
                <li className="breadcrumb-item"><span className="active">{user &&
                <span>{user.name} {user.surname}</span>}</span></li>
            </Breadcrumb>

            <Heading className="pageHeading mt-4 mb-5">Profil uživatele</Heading>
            {user &&
            <Row className="mb-5 align-items-center h-100">
                <Col lg={3} md={12} className="mb-4 mb-lg-0">
                    <div className="avatar-upload">
                        <div className="avatar-preview">
                            <div id="imagePreview">
                                {user.avatar_public_id
                                    ? <Image roundedCircle src={user.avatar_url} fluid/>
                                    : <Image roundedCircle src={defaultAvatar} fluid/>
                                }
                            </div>
                        </div>
                    </div>
                </Col>


                <Col className="mx-auto" lg={8} md={12}>
                    <Row className="teamDetailDesc">
                        <Col md={4} sm={4} xs={6}>
                            <p>E-mail</p>
                            <Heading size="xs">
                                <a className="text-decoration-none" href={"mailto:" + user.email}>{user.email}
                                    <FontAwesomeIcon className="ml-2" icon={Icons.faEnvelope}/>
                                </a>
                            </Heading>
                        </Col>
                        <Col md={4} sm={4} xs={6}>
                            <p>Jméno</p>
                            <Heading size="xs">{user.name}</Heading>
                        </Col>
                        <Col className="mt-sm-0 mt-3" md={4} sm={4} xs={6}>
                            <p>Příjmení</p>
                            <Heading size="xs">{user.surname}</Heading>
                        </Col>
                    </Row>
                </Col>
            </Row>
            }

            <div>
                <UserTeams/>
                <UserCompetitions/>
            </div>
        </div>
    );
}
