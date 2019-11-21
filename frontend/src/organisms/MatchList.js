import Image from "react-bootstrap/esm/Image";
import loadingGif from "../assets/images/loading.gif";
import {Heading} from "../atoms";
import {Table} from "./Table";
import React from "react";
import moment from "moment";
import {FilteringOptions} from "../pages/administration/Team/components/FilteringOptions";
import {useHistory} from "react-router-dom";

export function MatchList({matchesState, id_team, admin}) {
    const history = useHistory();
    function handleClick(row) {
        if (row) {
            if(admin === true) {
                history.push(`/administration/teams/${id_team}/matches/${row.original.id_match}`);
            } else {
                history.push(`/teams/${id_team}/matches/${row.original.id_match}`);
            }
        }
    }
    const columns = [
        {
            Header: "Datum",
            accessor: "date",
            Cell: props =>
                moment(props.value).locale('cs').format('L'),
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    return row[filter.id].substring(0,4) === filter.value.substring(0,4);
                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    {
                        FilteringOptions(matchesState, "date", 0, 4)
                    }
                </select>
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
                    {
                        FilteringOptions(matchesState, "host_name")
                    }
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
                    {
                        FilteringOptions(matchesState, "guest_name")
                    }
                </select>
        },
        {
            Header: "Skóre",
            accessor: "score",
            Cell: props =>
              <span>{props.original.goals_host}:{props.original.goals_guest}</span>,
            filterable: false,
        },
        {
            Header: "Soutěž",
            accessor: "competition_name",
            Cell: row => row.original.competition_name===null ?  "Amatérský zápas" : row.original.competition_name,
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else if (filter.value === 'Amatérský zápas') {
                    return row[filter.id] === null;
                } else {
                    return row[filter.id] === filter.value

                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    {
                        FilteringOptions(matchesState, "competition_name")
                    }
                </select>
        },
    ];

    return (
        <div>
            <h2 className="mt-4">Odehrané zápasy</h2>

            {matchesState.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!matchesState.isLoading && matchesState.error) && <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!matchesState.isLoading && !matchesState.error) &&
            <Table columns={columns} data={matchesState.team_data} getTdProps={(state, rowInfo) => {
                return {

                    onClick: () => {
                        handleClick(rowInfo);
                    }
                }
            }}/>
            }
        </div>
    )
}