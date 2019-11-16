import React from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {NavLink as Link, useHistory, useParams} from "react-router-dom";
import {useGetTeam} from "../../../api/team/teamClient_v1";
import {useApi} from "../../../hooks/useApi";
import {useGetMembers} from "../../../api/team/teamClient_v1";
import {TeamDataForm} from "./components/TeamDataForm";
import {useAuth} from "../../../utils/auth";

export function TeamAdminPage() {
    const history = useHistory();
    const {user} = useAuth();
    if (!user) {
        window.flash("Na tuto stránku mají přístup jen přihlášení uživatelé!", "danger");
        history.replace('/');
    }
    let {id_team} = useParams();
    const [state] = useGetTeam(id_team);

    if(!state.isLoading && !state.error) {
        if(user.id_user !== state.team_data.id_leader){
            window.flash("Na tuto stránku má přístup pouze vedoucí zobrazovaného týmu!", "danger");
            history.replace('/');
        }
    }

    const [membersState] = useGetMembers(id_team);
    const api = useApi();

    return (
        <div>
            {(state.isLoading || membersState.isLoading) && <div>Načítám data...</div>}
            {((!state.isLoading && state.error) || (!membersState.isLoading && membersState.error)) && <div>Data se nepodařilo načíst</div>}
            {((!state.isLoading && !state.error) && (!membersState.isLoading && !membersState.error)) &&
                <div>
                    <Breadcrumb>
                        <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                        <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
                        <li className="breadcrumb-item"><Link to="/administration/teams">Moje týmy</Link></li>
                        <li className="breadcrumb-item"><span className="active">{state.team_data.name}</span></li>
                    </Breadcrumb>
                    <TeamDataForm api={api} team_data={state.team_data} membersState={membersState}/>
                </div>
            }
        </div>
    );
}
