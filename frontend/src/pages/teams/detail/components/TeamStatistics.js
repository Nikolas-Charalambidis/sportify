import React from 'react';
import ReactTable from "react-table";
import {useParams} from "react-router-dom";
import {useGetTeamStatistics} from "../../../../api/team/teamClient_v1";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {mapSportToIcon} from "../../../../utils/mapper";
import {Heading} from "../../../../atoms";

export function TeamStatistics() {
    let {id_team} = useParams();
    const [state] = useGetTeamStatistics(id_team);

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
                    data={state.team_data}
                    columns={[{columns}]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            )}
        </div>
    );
}

const columns = [
    {
        Header: "Sport",
        accessor: "id_sport",
        Cell: row => <FontAwesomeIcon icon={mapSportToIcon(row.value)} size="2x"/>,
    },
    {
        Header: "Název soutěže",
        accessor: "competition_name",
    },
    {
        Header: "Umístění",
        accessor: "team_position",
    }
];