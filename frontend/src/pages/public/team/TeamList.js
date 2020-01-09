import React from 'react';
import {useHistory} from 'react-router-dom';
import {Heading} from '../../../basicComponents';
import {useGetTeams} from "../../../api/teamClient_v1";
import "react-table/react-table.css";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {Table} from "../../../basicComponents/Table";
import {useGetSports, useGetTeamTypes} from "../../../api/othersClient_v1";
import {TeamListBreadcrumbs} from "../../../organisms/breadcrumbs/TeamListBreadcrumbs";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

export function TeamList() {
    const [state] = useGetTeams();
    let history = useHistory();
    const [typesState] = useGetTeamTypes();
    const [sportsState] = useGetSports();

    function handleClick(row) {
        if (row) {
            history.push("/teams/" + row.original.id_team);
        }
    }

    const columns = [
        {
            Header: "Název týmu",
            accessor: "name",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
        {
            Header: "Sport",
            accessor: "sport",
            Cell: ({row}) => (<span>{row.sport}</span>),
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
                    {sportsState.sports.map((anObjectMapped, index) => (
                        <option key={index} value={anObjectMapped.sport}>{anObjectMapped.sport}</option>
                    ))}
                </select>
        },
        {
            Header: "Vedoucí",
            accessor: "leader",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
        {
            Header: "Typ týmu",
            accessor: "type",
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
                    {typesState.types.map((anObjectMapped, index) => (
                        <option key={index} value={anObjectMapped.type}>{anObjectMapped.type}</option>
                    ))}
                </select>
        }
    ];

    if(state.isLoading || sportsState.isLoading || typesState.isLoading) {
        return (
            <div>
                <TeamListBreadcrumbs />
                <Heading>Přehled týmů</Heading>
                <div className="text-center"><Image src={loadingGif}/></div>
            </div>
        );
    }

    if((!sportsState.isLoading && sportsState.error) || (!typesState.isLoading && typesState.error) || (!state.isLoading && state.error)) {
        return (
            <div>
                <TeamListBreadcrumbs />
                <Heading>Přehled týmů</Heading>
                <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>
            </div>
        );
    }

    return (
        <div>
            <TeamListBreadcrumbs />
            <Heading>Přehled týmů</Heading>
            {((!sportsState.isLoading && !sportsState.error) && (!typesState.isLoading && !typesState.error) && (!state.isLoading && !state.error)) ?
                <Table columns={columns} data={state.teams_data} getTdProps={(state, rowInfo) => {
                    return {
                        onClick: () => {
                            handleClick(rowInfo);
                        }
                    }
                }}/>
                : <UnexpectedError/>
            }
        </div>
    );
}