import React, {useState} from 'react';
import {Heading} from '../../../basicComponents';
import {CardTemplate} from '../../../basicComponents/CardTemplate';
import {Row} from 'react-bootstrap';
import {useAuth} from '../../../utils/auth';
import {useApi} from '../../../hooks/useApi';
import {mapSportToIcon} from '../../../utils/mapper';
import {useGetUser, useGetUserTeams, useGetUserCompetition} from '../../../api/userClient_v1';

import {UserChangePasswordModal} from '../../../organisms/user/admin/UserChangePasswordModal';
import {UserDataFormAdmin} from '../../../organisms/user/admin/UserDataFormAdmin';
import defaultTeamAvatar from "../../../assets/images/default_team_avatar.svg";
import defaultCompetitionAvatar from "../../../assets/images/default_competition_avatar.jpg";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {UserProfileBreadcrumbs} from "../../../organisms/breadcrumbs/UserProfileBreadcrumbs";

export function UserProfile() {
    const {user} = useAuth();
    const api = useApi();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state] = useGetUser(user.id_user);
    const [teamState] = useGetUserTeams(user.id_user);
    const [competitionState] = useGetUserCompetition(user.id_user);

    return (
        <div>
            <UserProfileBreadcrumbs />
            <Heading className="pageHeading mt-4 mb-5">Uživatelský profil</Heading>

            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <div>
                    <UserDataFormAdmin api={api} handleShow={handleShow} state={state}/>

                    <h2 className="mt-4">Týmy ve kterých hraju</h2>
                    {teamState.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
                    {!teamState.isLoading && !teamState.error && teamState.user_data.length === 0 && (
                        <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 text-center">Zatím nejste členem žádného
                            týmu</Heading>)}
                    {!teamState.isLoading && teamState.error &&
                    <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo
                        načíst</Heading>}
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

                    <h2 className="mt-4">Soutěže ve kterých hraju</h2>

                    {competitionState.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
                    {(!competitionState.isLoading && !competitionState.error && competitionState.user_data.length === 0) &&
                        <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 text-center">
                            Zatím není členem žádné soutěže
                        </Heading>
                    }
                    {(!competitionState.isLoading && competitionState.error) &&
                        <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">
                            Data se nepodařilo  načíst
                        </Heading>
                    }
                    {(!competitionState.isLoading && !competitionState.error) ? (
                        <div>
                            <Row>
                                {competitionState.user_data.map((anObjectMapped, index) => (
                                    <CardTemplate
                                        key={index}
                                        redirect={`../competitions/${anObjectMapped.id_competition}`}
                                        title={`${anObjectMapped.competition_name}`}
                                        subtitle={`Umístění: ${anObjectMapped.team_position}`}
                                        tooltipPictureHeader={`${anObjectMapped.sport}`}
                                        pictureHeader={mapSportToIcon(anObjectMapped.id_sport)}
                                        textHeader={anObjectMapped.is_active === 1 ? ("Probíhá") : ("Ukončená")}
                                        mainPicture={anObjectMapped.avatar_url ? (`${anObjectMapped.avatar_url}`) : (defaultCompetitionAvatar)}
                                    />
                                ))}
                            </Row>
                        </div>
                    ) : null}

                    <UserChangePasswordModal show={show} id_user={user.id_user} api={api} handleClose={handleClose}
                    />
                </div>
            )}
        </div>
    );
}
