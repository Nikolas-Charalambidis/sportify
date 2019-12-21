import {Col, Image, Row} from "react-bootstrap";
import defaultTeamAvatar from "../../../assets/images/default_team_avatar.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {NavLink as Link} from "react-router-dom";
import {Heading} from "../../../basicComponents";
import {mapSportToIcon} from "../../../utils/mapper";
import React from "react";

export function TeamData({state}) {

    return (
        <Row className="mb-5 align-items-center h-100">
            <Col lg={3} md={12} className="mb-4 mb-lg-0">
                <div className="avatar-upload">
                    <div className="avatar-preview">
                        <div id="imagePreview">
                            {state.team_data.avatar
                                ? <Image roundedCircle src={state.team_data.avatar} fluid/>
                                : <Image roundedCircle src={defaultTeamAvatar} fluid/>
                            }
                        </div>
                    </div>
                </div>
            </Col>

            <Col className="mx-auto" lg={8} md={12}>
                <Row className="teamDetailDesc">
                    <Col sm={3} xs={6}>
                        <p>Vedoucí <FontAwesomeIcon className="ml-2" icon={Icons.faEye}/></p>
                        <Link className="text-decoration-none" to={'/users/' + state.team_data.id_leader}>
                            <Heading size="xs">
                                {state.team_data.leader}
                            </Heading>
                        </Link>
                    </Col>
                    <Col sm={3} xs={6}>
                        <p>Kontakt <FontAwesomeIcon className="ml-2" icon={Icons.faEye}/></p>
                        <Link className="text-decoration-none" to={'/users/' + state.team_data.id_contact_person}>
                            <Heading size="xs">
                                {state.team_data.contact_person}

                            </Heading>
                        </Link>
                    </Col>
                    <Col sm={3} xs={6} className="mt-sm-0 mt-3">
                        <p>Typ týmu</p>
                        <Heading size="xs">{state.team_data.type}</Heading>
                    </Col>
                    <Col className="mt-sm-0 mt-3" sm={3} xs={6}>
                        <p>Sport  <FontAwesomeIcon className="ml-2" icon={mapSportToIcon(state.team_data.id_sport)}
                                                   size="1x"/></p>
                        <Heading size="xs">

                            {state.team_data.sport}
                        </Heading>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}