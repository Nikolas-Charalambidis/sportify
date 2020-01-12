import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Heading} from '../../../basicComponents';
import "react-table/react-table.css";
import {useGetCompetitionsPending} from "../../../api/competitionClient_v1";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {Table} from "../../../basicComponents/Table";
import { useGetCompetitionTypes, useGetSports } from "../../../api/othersClient_v1";
import {CompetitionListBreadcrumbs} from "../../../organisms/breadcrumbs/CompetitionListBreadcrumbs";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

export function CompetitionTeamJoinRequests() {
    let history = useHistory();
    let { id_competition } = useParams();
    const [state] = useGetCompetitionsPending(id_competition);
    const [sportsState] = useGetSports();
    const [typesState] = useGetCompetitionTypes();

    function handleClick(row) {
        if (row) {
            history.push("/competitions/" + row.original.id_competition);
        }
    }

    const columns = [
        {
            Header: "Název týmu",
            accessor: "name",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
    ];

    if(state.isLoading || sportsState.isLoading || typesState.isLoading) {
        return <div className="text-center"><Image src={loadingGif}/></div>;
    }

    if((!sportsState.isLoading && sportsState.error) || (!typesState.isLoading && typesState.error) || (!state.isLoading && state.error)) {
        return (
            <div>
                <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>
            </div>
        );
    }

    return (
        <div>
            <Heading className="mt-5">Žádosti o přidání do soutěže</Heading>
            {((!sportsState.isLoading && !sportsState.error) && (!typesState.isLoading && !typesState.error) && (!state.isLoading && !state.error)) ?
                <Table columns={columns} data={state.competitions} getTdProps={(state, rowInfo) => {
                    return {
                        onClick: () => {
                            handleClick(rowInfo);
                        }
                    }
                }} />
                : <UnexpectedError/>
            }
        </div>
    );
}