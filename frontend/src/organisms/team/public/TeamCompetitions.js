import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useGetTeamCompetition} from "../../../api/teamClient_v1";
import {Table} from "../../../basicComponents/Table";
import moment from "moment";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

export function TeamCompetitions({admin}) {
    let {id_team} = useParams();
    const history = useHistory();
    const [state] = useGetTeamCompetition(id_team);

    function handleClick(row) {
        if (row) {
            if(admin === true) {
                history.push(`/administration/competitions/${row.original.id_competition}`);
            } else {
                history.push(`/competitions/${row.original.id_competition}`);
            }
        }
    }

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

    if(state.isLoading) {
        return <LoadingGif />;
    }

    if(!state.isLoading && state.error) {
        return <DataLoadingError />;
    }

    return (
        <div>
            {(!state.isLoading && !state.error) ?
                <Table className="defaultCursor" columns={columns} data={state.team_data} getTdProps={(state, rowInfo) => {
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

