import React from 'react';
import {useHistory} from 'react-router-dom';
import {Heading} from '../../../basicComponents';
import "react-table/react-table.css";
import {useGetCompetitions} from "../../../api/competitionClient_v1";
import {Table} from "../../../basicComponents/Table";
import { useGetCompetitionTypes, useGetSports } from "../../../api/othersClient_v1";
import {CompetitionListBreadcrumbs} from "../../../organisms/breadcrumbs/CompetitionListBreadcrumbs";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";

function getUniqueCities(state) {
    const uniqueCities = [];
    if (!state.isLoading) {
        state.competitions.forEach(competition => {
            if (uniqueCities.indexOf(competition.city) === -1) {
                uniqueCities.push(competition.city)
            }
        });
    }
    return uniqueCities;
}

export function CompetitionList() {
    let history = useHistory();

    const [state] = useGetCompetitions();
    const [sportsState] = useGetSports();
    const [typesState] = useGetCompetitionTypes();

    const cities = getUniqueCities(state);

    function handleClick(row) {
        if (row) {
            history.push("/competitions/" + row.original.id_competition);
        }
    }

    const columns = [
        {
            Header: "Název soutěže",
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
            Header: "Město",
            accessor: "city",
            Cell: ({row}) => (<span>{row.city}</span>),
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
                    {cities.map((anObjectMapped, index) => (
                        <option key={index} value={anObjectMapped}>{anObjectMapped}</option>
                    ))}
                </select>
        },
        {
            Header: "Typ soutěže",
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
        },
        {
            Header: "Počet týmů",
            accessor: "teams_count",
            filterable: false
        }
    ];

    const header = (
        <div>
            <CompetitionListBreadcrumbs />
            <Heading>Přehled soutěží</Heading>
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
                <Table columns={columns} data={state.competitions} getTdProps={(state, rowInfo) => {
                    return {
                        onClick: () => {
                            handleClick(rowInfo);
                        }
                    }
                }} />
                : <UnexpectedError/>
            }
        </div>
    );

}