import React from 'react';
import {useParams} from "react-router-dom";
import {useGetTeamStatistics} from "../../../../../api/team/teamClient_v1";
import {Heading} from "../../../../../atoms";
import {Table} from "../../../../../organisms/Table";
import loadingGif from "../../../../../assets/images/loading.gif";
import Image from "react-bootstrap/esm/Image";

function getGoalkeepers(state, filterBy) {
    let competitionId = null;

    if (!state.isLoading) {
        if (filterBy === 'league') {
            return state.team.competitions_aggregate.filter(p => p.position === "goalkeeper");
        }

        if (filterBy !== 'training') {
            competitionId = parseInt(filterBy);
        }

        return state.team.individual.filter(p => p.position === "goalkeeper" && p.id_competition === competitionId);
    }
}

function getRank(playerData) {
    return (Number(playerData.index) + 1).toString();
}

export function TeamStatisticsGoalkeepers({filterBy}) {
    let {id_team} = useParams();
    const [state] = useGetTeamStatistics(id_team);

    const goalkeepers = getGoalkeepers(state, filterBy);
    const columns = [
        {
            Header: "Pořadí",
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
            accessor: "goalkeeper_matches",
        },
        {
            Header: "Minut",
            accessor: "goalkeeper_minutes",
        },
        {
            Header: "Góly",
            accessor: "goalkeeper_goals",
        },
        {
            Header: "Nuly",
            accessor: "field_points",
        },
        {
            Header: "Střely",
            accessor: "goalkeeper_shoots",
        },
        {
            Header: "%",
            accessor: "goalkeeper_success_rate",
        }
    ];

    return (
        <div>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <Table data={goalkeepers} columns={columns}/>
            )}
        </div>
    );
}


