import React from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {NavLink as Link, useParams} from "react-router-dom";
import {useGetTeam} from "../../../api/team/teamClient_v1";
import {useApi} from "../../../hooks/useApi";
import {useGetMembers} from "../../../api/team/teamClient_v1";
import {TeamDataForm} from "./components/TeamDataForm";

export function TeamAdminPage() {
    let {id_team} = useParams();
    const [state] = useGetTeam(id_team);
    const [membersState] = useGetMembers(id_team);
    console.log("members", membersState);
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
