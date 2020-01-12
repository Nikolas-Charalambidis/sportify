import React from 'react';
import {useHistory} from 'react-router-dom';
import {Heading} from '../../../basicComponents';
import {useGetTeams} from "../../../api/teamClient_v1";
import "react-table/react-table.css";
import {Table} from "../../../basicComponents/Table";
import {useGetSports, useGetTeamTypes} from "../../../api/othersClient_v1";
import {TeamListBreadcrumbs} from "../../../organisms/breadcrumbs/TeamListBreadcrumbs";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";

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

    const header = (
        <div>
            <TeamListBreadcrumbs />
            <Heading>Přehled týmů</Heading>
        </div>
    );

    if(state.isLoading || sportsState.isLoading || typesState.isLoading) {
        return <LoadingGif header={header}/>;
    }

    if((!sportsState.isLoading && sportsState.error) || (!typesState.isLoading && typesState.error) || (!state.isLoading && state.error)) {
        return <DataLoadingError header={header}/>;
    }

    return (
        <div>
            {header}
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