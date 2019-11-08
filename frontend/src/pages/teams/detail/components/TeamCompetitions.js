import React from 'react';
import {useParams} from "react-router-dom";
import {useGetTeamCompetition} from "../../../../api/team/teamClient_v1";
import {Heading} from "../../../../atoms";
import {Table} from "../../../../organisms/Table";
import moment from "moment";

export function TeamCompetitions() {
    let {id_team} = useParams();

    const [state] = useGetTeamCompetition(id_team);
    const columns = [
        {
            Header: "Název soutěže",
            accessor: "competition_name",
        },
        {
            Header: "Umístění",
            accessor: "team_position",
            filterable: false,
        },
        {
            id: "startDate",
            Header: "Začátek",
            accessor: d => {
                return moment(d.start_date)
                    .local()
                    .format("DD. MM. YYYY HH:mm")
            },
            filterable: false,
        },
        {
            id: "endDate",
            Header: "Konec",
            accessor: d => {
                return moment(d.end_date)
                    .local()
                    .format("DD. MM. YYYY HH:mm")
            },
            filterable: false,
        }
    ];

    return (
        <div>
            {state.isLoading && <div>Načítám data...</div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <Table className="defaultCursor" columns={columns} data={state.team_data}/>
            )}
        </div>
    );
}

