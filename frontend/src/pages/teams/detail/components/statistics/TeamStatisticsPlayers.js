import React from 'react';
import {useParams} from "react-router-dom";
import {useGetTeamStatistics} from "../../../../../api/team/teamClient_v1";
import {Heading} from "../../../../../atoms";
import {Table} from "../../../../../organisms/Table";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../../assets/images/loading.gif";
import {OverlayTriggerTable} from "../../../../../atoms/OverlayTriggerTable";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {useHistory} from 'react-router-dom';

function getPlayers(state, filterBy) {
    let competitionId = null;

    if (!state.isLoading) {
        if (filterBy === 'league') {
            return state.team.competitions_aggregate.filter(p => !p.is_goalkeeper);
        }

        if (filterBy !== 'training') {
            competitionId = parseInt(filterBy);
        }

        return state.team.individual.filter(p => !p.is_goalkeeper && p.id_competition === competitionId);
    }
}

function getRank(playerData) {
    return (Number(playerData.index) + 1).toString();
}

export function TeamStatisticsPlayers({filterBy}) {
    let {id_team} = useParams();
    let history = useHistory();
    const [state] = useGetTeamStatistics(id_team);
    console.log("state from statistics", state);

    const players = getPlayers(state, filterBy);
    if (players) {
        players.sort((a, b) => b.field_points - a.field_points);
    }

    function handleClick(row) {
        if (row) {
            history.push("/users/" + row.original.id_user);
        }
    }

    const columns = [
        {
            Header: "Pořadí",
            accessor: "rank",
            Cell: (playerData) => getRank(playerData),
            filterable: false,
        },
        {
            Header: "Jméno a příjmení",
            accessor: "name_surname",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().match(filter.value.toLowerCase())
        },
        {
            Header: "Počet zápasů",
            accessor: filterBy === "league" ? "matches" : "field_matches",
            filterable: false,
        },
        {
            Header: "Góly",
            accessor: filterBy === "league" ? "goals" : "field_goals",
            filterable: false,
        },
        {
            Header: "Asistence",
            accessor: filterBy === "league" ? "assists" : "field_assists",
            filterable: false,
        },
        {
            Header: <OverlayTriggerTable header="KB" placement="bottom" icon={Icons.faInfo} message="Součet gólů a asistencí" />,
            filterable: false,
            accessor: "field_points"
        },
        {
            Header: <OverlayTriggerTable header="Pr. KB" placement="bottom" icon={Icons.faInfo} message="Průměr Kanadského bodu na zápas" />,
            accessor: "field_average_points",
            filterable: false,
        },
        {
            Header: "Trestné minuty",
            accessor: filterBy === "league" ? "suspensions" : "field_suspensions",
            filterable: false,
        }
    ];

    return (
        <div>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!state.isLoading && state.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!state.isLoading && !state.error) &&
                <Table data={players} columns={columns} getTdProps={(state, rowInfo) => {
                    return {
                        onClick: () => {
                            handleClick(rowInfo);
                        }
                    }
                }}/>
            }
        </div>
    );
}

