import {Table} from "../../basicComponents/Table";
import React from "react";
import moment from "moment";
import {FilteringOptions} from "../team/FilteringOptions";
import {useHistory} from "react-router-dom";
import {LoadingGif} from "../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../basicComponents/UnexpectedError";

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
              <span>{props.original.goals_host == null ? ' — ' : props.original.goals_host}:{props.original.goals_guest == null ? ' — ' : props.original.goals_guest}</span>,
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

    const header = <h2 className="mt-4">Odehrané zápasy</h2>;

    if(matchesState.isLoading) {
        return <LoadingGif header={header}/>;
    }

    if(!matchesState.isLoading && matchesState.error) {
        return <DataLoadingError header={header}/>;
    }

    return (
        <div>
            {header}
            {(!matchesState.isLoading && !matchesState.error) ?
                <Table columns={columns} data={matchesState.team_data} getTdProps={(state, rowInfo) => {
                        return {
                            onClick: () => {
                                handleClick(rowInfo);
                            }
                        }
                    }}
                />
                : <UnexpectedError/>
            }
        </div>
    )
}