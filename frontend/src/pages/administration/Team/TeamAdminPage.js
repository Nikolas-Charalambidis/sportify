import React from 'react';
import {Breadcrumb} from 'react-bootstrap';
import moment from 'moment'
import {NavLink as Link, useHistory, useParams} from "react-router-dom";
import {useGetTeam} from "../../../api/team/teamClient_v1";
import {useApi} from "../../../hooks/useApi";
import {useGetMembers, useGetTeamMatches} from "../../../api/team/teamClient_v1";
import {TeamDataForm} from "./components/TeamDataForm";
import {useAuth} from "../../../utils/auth";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {Heading} from "../../../atoms";
import {Table} from "../../../organisms/Table";

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

    const [matchesState] = useGetTeamMatches(id_team);

    function handleClick(row) {
        if (row) {
            history.push("/matches/" + row.original.id_match);
        }
    }


    const columns = [
        {
            Header: "Datum",
            accessor: "date",
            Cell: props => moment(props.value).format('L'),
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()),




        },
        {
            Header: "Domací",
            accessor: "host_name",
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    return row[filter.id] === filter.value;
                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    {matchesState.team_data.map((anObjectMapped, index) => (
                        <option key={index} value={anObjectMapped.host_name}>{anObjectMapped.host_name}</option>
                    ))}
                </select>
        },
        {
            Header: "Hosté",
            accessor: "guest_name",
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    return row[filter.id] === filter.value;
                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    {matchesState.team_data.map((anObjectMapped, index) => (
                        <option key={index} value={anObjectMapped.guest_name}>{anObjectMapped.guest_name}</option>
                    ))}
                </select>
        },
        {
            Header: "Skóre",
            accessor: "score",
            Cell: ({row}) => (<span>{row.type}</span>),
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    return row[filter.id] === filter.value;
                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    {matchesState.team_data.map((anObjectMapped, index) => (
                        <option key={index} value={anObjectMapped.host_name}>{anObjectMapped.host_name}</option>
                    ))}
                </select>
        },
        {
            Header: "Soutěž",
            accessor: "competition_name",
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    return row[filter.id] === filter.value;
                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    {matchesState.team_data.map((anObjectMapped, index) => (
                        <option key={index} value={anObjectMapped.competition_name}>{anObjectMapped.competition_name}</option>
                    ))
                    }
                </select>
        },
    ];

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
            <h2 className="mt-4">Odehrané zápasy</h2>
            {(state.isLoading || matchesState.isLoading) && <div className="text-center"><Image src={loadingGif}/></div>}
            {((!matchesState.isLoading && matchesState.error) || (!state.isLoading && state.error)) && <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {((!matchesState.isLoading && !matchesState.error) && (!state.isLoading && !state.error)) && (
                <Table columns={columns} data={matchesState.team_data} getTdProps={(state, rowInfo) => {
                    return {
                        onClick: () => {
                            handleClick(rowInfo);
                        }
                    }
                }}/>
            )}
        </div>
    );
}
