import React from 'react';
import ReactTable from "react-table";
import {useParams} from "react-router-dom";
import {useGetTeamStatistics} from "../../../../api/team/teamClient_v1";
import { Heading } from "../../../../atoms";

function getPlayers(state) {
    if (!state.isLoading) {        
        return state.team.competitions_aggregate.filter(p => p.position !== "goalkeeper");
    }
};

function getGoalkeepers(state) {
    if (!state.isLoading) {
        return state.team.competitions_aggregate.filter(p => p.position === "goalkeeper");
    }
};

function getRank(playerData) {
    return (Number(playerData.index) + 1).toString();
}

export function TeamStatistics() {
    let { id_team } = useParams();
    const [state] = useGetTeamStatistics(id_team);
    const players = getPlayers(state);
    const goalkeepers = getGoalkeepers(state);
    console.log(players);
    console.log(goalkeepers);

    return (
        <div>
            {state.isLoading && <div>Načítám data...</div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <ReactTable
                    previousText="Předchozí"
                    nextText="Další"
                    pageText="Stránka"
                    ofText="z"
                    rowsText="řádků"
                    noDataText="Nenalezená žádná data"
                    rows
                    data={players.sort(function (a, b) {
                        return parseFloat(b.field_points) - parseFloat(a.field_points);
                    })}
                    filterable
                    columns={[{ columns }]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            )}
        </div>
    );
}

const columns = [
    {
        Header: "Umístění",
        accessor: "rank",
        Cell: (playerData) => getRank(playerData),
    },
    {
        Header: "Jméno a příjmení",
        accessor: "name_surname",
        filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().match(filter.value.toLowerCase())
    },
    {
        Header: "Počet zápasů",
        accessor: "matches",
    },
    {
        Header: "Góly",
        accessor: "goals",
    },
    {
        Header: "Asistence",
        accessor: "assists",
    },
    {
        Header: "KB",
        accessor: "field_points",
    },
    {
        Header: "Pr.KB",
        accessor: "field_average_points",
    },
    {
        Header: "Trestné minuty",
        accessor: "suspensions",
    }
];