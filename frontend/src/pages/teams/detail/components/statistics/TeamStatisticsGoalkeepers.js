import React from 'react';
import {useParams} from "react-router-dom";
import {useGetTeamStatistics} from "../../../../../api/team/teamClient_v1";
import {Heading} from "../../../../../atoms";
import {Table} from "../../../../../organisms/Table";
import loadingGif from "../../../../../assets/images/loading.gif";
import Image from "react-bootstrap/esm/Image";
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {OverlayTriggerTable} from "../../../../../atoms/OverlayTriggerTable";

function getGoalkeepers(state, filterBy) {
    let competitionId = null;

    if (!state.isLoading) {
        if (filterBy === 'league') {
            return state.team.competitions_aggregate.filter(p => p.is_goalkeeper);
        }

        if (filterBy !== 'training') {
            competitionId = parseInt(filterBy);
        }

        return state.team.individual.filter(p => p.is_goalkeeper && p.id_competition === competitionId)
    }
}

function getRank(playerData) {
    return (Number(playerData.index) + 1).toString();
}

export function TeamStatisticsGoalkeepers({filterBy}) {
    let {id_team} = useParams();
    const [state] = useGetTeamStatistics(id_team);

    const goalkeepers = getGoalkeepers(state, filterBy);
    if (goalkeepers) {
        goalkeepers.sort((a, b) => b.goalkeeper_success_rate - a.goalkeeper_success_rate);
    }

    const columns = [
        {
            Header: "Pořadí",
            accessor: "rank",
            filterable: false,
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
            filterable: false,
            accessor: "goalkeeper_matches",
        },
        {
            Header: <OverlayTriggerTable header="Minut" placement="bottom" icon={Icons.faInfo} message="Počet odehraných minut" />,
            accessor: "goalkeeper_minutes",
            filterable: false,
        },
        {
            Header: <OverlayTriggerTable header="Góly" placement="bottom" icon={Icons.faInfo} message="Poče obdržených gólů" />,
            accessor: "goalkeeper_goals",
            filterable: false,
        },
        {
            Header: <OverlayTriggerTable header="Nuly" placement="bottom" icon={Icons.faInfo} message="Počet vychytaných nul na zápas" />,
            accessor: "goalkeeper_zeros",
            filterable: false,
        },
        {
            Header: <OverlayTriggerTable header="Střely" placement="bottom" icon={Icons.faInfo} message="Počet vychytaných střel" />,
            accessor: "goalkeeper_shoots",
            filterable: false,
        },
        {
            Header: <OverlayTriggerTable header="Úspěšnost" placement="bottom" icon={Icons.faInfo} message="% úspěšnost brankáře" />,
            accessor: "goalkeeper_success_rate",
            filterable: false,
        }
    ];

    return (
        <div>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <Table className="defaultCursor" data={goalkeepers} columns={columns}/>
            )}
        </div>
    );
}

