import React from 'react';
import {useParams} from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {useHistory} from 'react-router-dom';
import {useGetCompetitionsStatistics} from "../../../api/competitionClient_v1";
import {OverlayTriggerTable} from "../../../basicComponents/OverlayTriggerTable";
import {Heading} from "../../../basicComponents";
import {Table} from "../../../basicComponents/Table";
import loadingGif from "../../../assets/images/loading.gif";

function getPlayers(state) {
    if (!state.isLoading) {
        return state.statistics.sort((a, b) => b.goalkeeper_success_rate - a.goalkeeper_success_rate);
    }
}

function getRank(playerData) {
    return (Number(playerData.index) + 1).toString();
}

export function CompetitionStatisticsGoalkeepers({isGoalKeeper}) {
    let {id_competition} = useParams();
    let history = useHistory();
    const [state] = useGetCompetitionsStatistics(id_competition, isGoalKeeper);

    const players = getPlayers(state);
    function handleClick(row) {
        if (row) {
            history.push("/users/" + row.original.id_user);
        }
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
            accessor: "goalkeeper_shots",
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
                <Table data={players} columns={columns} getTdProps={(state, rowInfo) => {
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

