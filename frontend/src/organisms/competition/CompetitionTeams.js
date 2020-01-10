import {useHistory, useParams} from "react-router";
import {Table} from "../../basicComponents/Table";
import React from "react";
import {useGetCompetitionsTeams} from "../../api/competitionClient_v1";
import {LoadingGif} from "../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../basicComponents/UnexpectedError";

function getRank(competitionData) {
    return (Number(competitionData.index) + 1).toString();
}

export function CompetitionTeams() {
    let {id_competition} = useParams();
    let history = useHistory();
    const [state] = useGetCompetitionsTeams(id_competition);
    const columns = [
        {
            Header: "Poř.",
            accessor: "rank",
            Cell: (competitionData) => getRank(competitionData),
            filterable: false,
            width: 50
        },
        {
            Header: "Název tymu",
            accessor: "name",
        },
        {
            Header: "Zápasy",
            accessor: "matches",
            filterable: false,
            width: 100
        },
        {
            Header: "Výhry",
            accessor: "wins",
            filterable: false,
            width: 100
        },
        {
            Header: "Výhry prodl.",
            accessor: "wins_extension",
            filterable: false,
            width: 100
        },
        {
            Header: "Remízy",
            accessor: "draws",
            filterable: false,
            width: 100
        },
        {
            Header: "Prohry",
            accessor: "loses",
            filterable: false,
            width: 100
        },
        {
            Header: "Skóre",
            accessor: "score",
            filterable: false,
            width: 100
        },
        {
            Header: "Body",
            accessor: "points",
            filterable: false,
            width: 100
        },
    ];

    function handleClick(row) {
        if (row) {
            history.push("/teams/" + row.original.id_team);
        }
    }

    if(state.isLoading) {
        return <LoadingGif />;
    }

    if(!state.isLoading && state.error) {
        return <DataLoadingError />;
    }

    return (
        <div>
            {(!state.isLoading && !state.error) ?
                <Table className="defaultCursor" columns={columns} data={state.competitions_teams} getTdProps={(state, rowInfo) => {
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
    );
}