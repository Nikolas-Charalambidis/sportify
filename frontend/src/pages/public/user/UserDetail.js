import React from 'react';
import {Heading} from '../../../basicComponents';
import {Row, Col, Image} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {useGetUser} from '../../../api/userClient_v1';
import defaultAvatar from "../../../assets/images/default_avatar.svg";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {UserCompetitionsListCards} from "../../../organisms/user/UserCompetitionsListCards";
import {UserTeamsListCards} from "../../../organisms/user/UserTeamsListCards";
import {UserDetailBreadcrumbs} from "../../../organisms/breadcrumbs/UserDetailBreadcrumbs";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";

export function UserDetail() {
    let {id_user} = useParams();
    const [state] = useGetUser(id_user);

    const header = (
        <div>
            <UserDetailBreadcrumbs />
            <Heading className="pageHeading mt-4 mb-5">Detail uživatele</Heading>
        </div>
    );

    if(state.isLoading) {
        return <LoadingGif header={header}/>;
    }

    if(!state.isLoading && state.error) {
        return <DataLoadingError header={header}/>;
    }

    const user = state.user_data;

    return (
        <div>
            {header}
            {(!state.isLoading && !state.error) ?
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
                : <UnexpectedError/>
            }

            <div>
                <UserTeamsListCards/>
                <UserCompetitionsListCards/>
            </div>
        </div>
    );
}
