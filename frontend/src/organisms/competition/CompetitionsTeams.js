import {useHistory, useParams} from "react-router";
import {Heading} from "../../basicComponents";
import {Table} from "../../basicComponents/Table";
import React from "react";
import {useGetCompetitionsTeams} from "../../api/competitionClient_v1";

export function CompetitionsTeams() {
    let {id_competition} = useParams();
    let history = useHistory();
    const [state] = useGetCompetitionsTeams(id_competition);
    const columns = [
        {
            Header: "Název tymu",
            accessor: "name",
        },
    ];

    function handleClick(row) {
        if (row) {
            history.push("/teams/" + row.original.id_team);
        }
    }

    return (
        <div>
            {state.isLoading && <div>Načítám data...</div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <Table className="defaultCursor" columns={columns} data={state.competitions_teams} getTdProps={(state, rowInfo) => {
                    return {
                        onClick: () => {
                            handleClick(rowInfo);
                        }
                    }
                }}/>
            )}
        </div>
    );
}