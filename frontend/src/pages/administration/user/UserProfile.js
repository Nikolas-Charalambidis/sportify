import React, {useState} from 'react';
import {Heading} from '../../../basicComponents';
import {useAuth} from '../../../utils/auth';
import {useApi} from '../../../hooks/useApi';
import {useGetUser, useGetUserTeams, useGetUserCompetition} from '../../../api/userClient_v1';
import {UserChangePasswordModal} from '../../../organisms/user/admin/UserChangePasswordModal';
import {UserDataFormAdmin} from '../../../organisms/user/admin/UserDataFormAdmin';
import {UserProfileBreadcrumbs} from "../../../organisms/breadcrumbs/UserProfileBreadcrumbs";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {UserTeamsAdmin} from "../../../organisms/user/admin/UserTeamsAdmin";
import {UserCompetitionsAdmin} from "../../../organisms/user/admin/UserCompetitionsAdmin";

export function UserProfile() {
    const {user} = useAuth();
    const api = useApi();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state] = useGetUser(user.id_user);
    const [teamState] = useGetUserTeams(user.id_user);
    const [competitionState] = useGetUserCompetition(user.id_user);

    const header = (
        <div>
            <UserProfileBreadcrumbs />
            <Heading className="pageHeading mt-4 mb-5">Uživatelský profil</Heading>
        </div>
    );

    if(state.isLoading) {
        return <LoadingGif header={header}/>;
    }

    if(!state.isLoading && state.error) {
        return <DataLoadingError header={header}/>;
    }

    return (
        <div>
            {header}
            {!state.isLoading && !state.error && (
                <div>
                    <UserDataFormAdmin api={api} handleShow={handleShow} state={state}/>

                    <h2 className="mt-4">Týmy ve kterých hraju</h2>
                    <UserTeamsAdmin teamState={teamState}/>

                    <h2 className="mt-4">Soutěže ve kterých hraju</h2>
                    <UserCompetitionsAdmin competitionState={competitionState}/>

                    <UserChangePasswordModal show={show} id_user={user.id_user} api={api} handleClose={handleClose}
                    />
                </div>
            )}
        </div>
    );
}
