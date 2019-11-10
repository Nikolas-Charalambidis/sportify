import React, {useState} from 'react';
import {Heading} from '../../../atoms';
import {CardTemplate} from '../../../templates/CardTemplate';
import {Row, Breadcrumb} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {useAuth} from '../../../utils/auth';
import {useApi} from '../../../hooks/useApi';
import {mapSportToIcon} from '../../../utils/mapper';
import {useGetUser, useGetUserTeams, useGetUserCompetition} from '../../../api/user/userClient_v1';
import {NavLink as Link} from 'react-router-dom';
import {ChangePasswordModal} from './components/ChangePasswordModal';
import {UserDataForm} from './components/UserDataForm';
import defaultTeamAvatar from "../../../assets/images/default_team_avatar.svg";
import defaultCompetitionAvatar from "../../../assets/images/default_competition_avatar.jpg";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {getPositionEnumName} from "../../../utils/enum-helper";

export function Profile() {
    const history = useHistory();
    const {user} = useAuth();
    const api = useApi();
    if (!user) {
        history.replace('/');
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state] = useGetUser(user.id_user);
    const [teamState] = useGetUserTeams(user.id_user);
    const [competitionState] = useGetUserCompetition(user.id_user);

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item">
                    <Link to="/">Domů</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/administration">Administrace</Link>
                </li>
                <li className="breadcrumb-item">
                    <span className="active">Profil</span>
                </li>
            </Breadcrumb>
            <Heading className="pageHeading mt-4 mb-5">Uživatelský profil</Heading>

            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <div>
                    <UserDataForm api={api} handleShow={handleShow} state={state}/>

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
                                        subtitle={`Pozice: ${getPositionEnumName(anObjectMapped.position)}`}
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
                    {!competitionState.isLoading && !competitionState.error && competitionState.user_data.length === 0 && (
                        <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 text-center">Zatím není členem žádné
                            soutěže</Heading>)}
                    {!competitionState.isLoading && competitionState.error &&
                    <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo
                        načíst</Heading>}
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
                                        mainPicture={anObjectMapped.avatar_url ? (`${anObjectMapped.avatar_url}`) : (defaultCompetitionAvatar)}
                                    />
                                ))}
                            </Row>
                        </div>
                    ) : null}

                    <ChangePasswordModal show={show} id_user={user.id_user} api={api} handleClose={handleClose}
                    />
                </div>
            )}
        </div>
    );
}
