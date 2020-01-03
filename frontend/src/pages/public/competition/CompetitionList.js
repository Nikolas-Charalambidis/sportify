import React from 'react';
import {NavLink as Link, useHistory} from 'react-router-dom';
import {Heading} from '../../../basicComponents';
import { Breadcrumb, Button } from 'react-bootstrap';
import "react-table/react-table.css";
import {useGetCompetitions} from "../../../api/competitionClient_v1";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {Table} from "../../../basicComponents/Table";
import { useGetCompetitionTypes, useGetSports } from "../../../api/othersClient_v1";
import { useAuth } from '../../../utils/auth';

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

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><span className="active">Soutěže</span></li>
            </Breadcrumb>
            <Heading>Přehled soutěží</Heading>

            {(state.isLoading || sportsState.isLoading || typesState.isLoading) &&
            <div className="text-center"><Image src={loadingGif}/></div>}
            {((!sportsState.isLoading && sportsState.error) || (!typesState.isLoading && typesState.error) || (!state.isLoading && state.error)) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {((!sportsState.isLoading && !sportsState.error) && (!typesState.isLoading && !typesState.error) && (!state.isLoading && !state.error)) && (
                <Table columns={columns} data={state.competitions} getTdProps={(state, rowInfo) => {
                    return {
                        onClick: () => {
                            handleClick(rowInfo);
                        }
                    }
                }} />                
            )}

            {user &&
                <Button className="float-right mt-3" variant="primary" onClick={onCreateCompetition}>Vytvořit soutěž</Button>
            }
        </div>
    );
}