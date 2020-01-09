import React from 'react';
import {useHistory} from 'react-router-dom';
import {Heading} from '../../../basicComponents';
import { Button } from 'react-bootstrap';
import "react-table/react-table.css";
import {useGetCompetitions} from "../../../api/competitionClient_v1";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {Table} from "../../../basicComponents/Table";
import { useGetCompetitionTypes, useGetSports } from "../../../api/othersClient_v1";
import { useAuth } from '../../../utils/auth';
import {CompetitionListBreadcrumbs} from "../../../organisms/breadcrumbs/CompetitionListBreadcrumbs";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

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

    const { user } = useAuth();
    const [state] = useGetCompetitions();
    const [sportsState] = useGetSports();
    const [typesState] = useGetCompetitionTypes();

    const cities = getUniqueCities(state);

    function handleClick(row) {
        if (row) {
            history.push("/competitions/" + row.original.id_competition);
        }
    }

    function onCreateCompetition() {
        history.push("/administration/competition/create");
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

    if(state.isLoading || sportsState.isLoading || typesState.isLoading) {
        return <div className="text-center"><Image src={loadingGif}/></div>;
    }

    if((!sportsState.isLoading && sportsState.error) || (!typesState.isLoading && typesState.error) || (!state.isLoading && state.error)) {
        return (
            <div>
                <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>
            </div>
        );
    }

    return (
        <div>
            <CompetitionListBreadcrumbs />
            <Heading>Přehled soutěží</Heading>
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

            {user &&
                <Button className="float-right mt-3" variant="primary" onClick={onCreateCompetition}>Vytvořit soutěž</Button>
            }
        </div>
    );
}