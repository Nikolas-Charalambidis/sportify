import React, {useState} from 'react';
import {Heading} from '../atoms';
import {CardTemplate} from '../templates/CardTemplate';
import {Breadcrumb, Row, Col, Image, Tabs, Tab, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {useHistory} from 'react-router';
import { useParams } from "react-router-dom";
import {mapSportToIcon} from '../utils/mapper';
import {useGetUser, useGetUserTeams, useGetUserCompetition} from '../api/user/userClient_v1';
import {NavLink as Link} from 'react-router-dom';
import defaultTeamAvatar from "../assets/images/default_team_avatar.jpg";

function getUser(state) {
    if (state) {
        return state.user_data;
    }    
}

export function User() {
    const history = useHistory();    

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { id_user } = useParams();

    const [state] = useGetUser(id_user);
    const user = getUser(state);
    const [teamState] = useGetUserTeams(id_user);
    const [competitionState] = useGetUserCompetition(id_user);
    

    console.log(user);

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item">
                    <Link to="/">Domů</Link>
                </li>
                <li className="breadcrumb-item">
                    <span className="active">{user && <span>{user.name} {user.surname}</span>}</span>
                </li>
            </Breadcrumb>
            <Heading className="pageHeading mt-4 mb-5">Uživatelský profil</Heading>

            {user &&
                <Row className="mb-5 align-items-center h-100">
                    <Col lg={3} md={12} className="mb-4 mb-lg-0">
                        <div className="avatar-upload">
                            <div className="avatar-preview">
                                <div id="imagePreview">
                                {user.avatar_public_id
                                    ? <Image roundedCircle src={user.avatar_public_id} fluid />
                                    : <Image roundedCircle src={defaultTeamAvatar} fluid />
                                }
                                </div>
                            </div>
                        </div>
                    </Col>


                    <Col className="mx-auto" lg={8} md={12}>
                        <Row className="teamDetailDesc">
                            <Col md={4} sm={4} xs={6}>
                                <p>E-mail</p>
                                <Heading size="xs">{user.email}</Heading>
                            </Col>
                            <Col md={4} sm={4} xs={6}>
                                <p>Jméno</p>
                                <Heading size="xs">{user.name}</Heading>
                            </Col>
                            <Col md={4} sm={4} xs={6}>
                                <p>Příjmení</p>
                                <Heading size="xs">{user.surname}</Heading>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
            

            {state.isLoading && <div>Načítám data...</div>}
            {!state.isLoading && state.error && <div>Data se nepodařilo načíst</div>}
            {!state.isLoading && !state.error && (
                <div>

                    <h2 className="mt-4">Týmy ve kterých hraje</h2>
                    {!teamState.isLoading && !teamState.error && teamState.user_data.length === 0 && (
                        <div>Zatím není členem žádného týmu</div>)}
                    {!teamState.isLoading && teamState.error && (<div>Data se nepodařilo načíst</div>)}
                    {!teamState.isLoading && !teamState.error ? (
                        <div>
                            <Row>
                                {teamState.user_data.map((anObjectMapped, index) => (
                                    <CardTemplate
                                        key={index}
                                        redirect={`../teams/${anObjectMapped.id_team}`}
                                        title={`${anObjectMapped.name}`}
                                        subtitle={`Pozice: ${anObjectMapped.position}`}
                                        tooltipPictureHeader={`${anObjectMapped.sport}`}
                                        pictureHeader={mapSportToIcon(anObjectMapped.id_sport)}
                                        mainPicture={anObjectMapped.avatar_url ? (`${anObjectMapped.avatar_url}`) : (defaultTeamAvatar)}
                                    />
                                ))}
                            </Row>
                        </div>
                    ) : null}

                    <h2 className="mt-4">Soutěže ve kterých hraje</h2>
                    {!competitionState.isLoading && !competitionState.error && competitionState.user_data.length === 0 && (
                        <div>Zatím nejste členem žádné soutěže</div>)}
                    {!competitionState.isLoading && competitionState.error && (<div>Data se nepodařilo načíst</div>)}
                    {!competitionState.isLoading && !competitionState.error ? (
                        <div>
                            <Row>
                                {competitionState.user_data.map((anObjectMapped, index) => (
                                    <CardTemplate
                                        key={index}
                                        redirect={`../leagues/${anObjectMapped.id_competition}`}
                                        title={`${anObjectMapped.competition_name}`}
                                        subtitle={`Umístění: ${anObjectMapped.team_position}`}
                                        tooltipPictureHeader={`${anObjectMapped.sport}`}
                                        pictureHeader={mapSportToIcon(anObjectMapped.id_sport)}
                                        textHeader={anObjectMapped.is_active === 1 ? ("Probíhá") : ("Ukončená")}
                                        mainPicture={anObjectMapped.avatar_url ? (`${anObjectMapped.avatar_url}`) : (defaultTeamAvatar)}
                                    />
                                ))}
                            </Row>
                        </div>
                    ) : null}

                </div>
            )}
        </div>
    );
}
