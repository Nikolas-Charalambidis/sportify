import React from 'react';
import {useHistory} from 'react-router-dom';
import {Heading} from '../../../basicComponents';
import {Button} from "react-bootstrap";
import "react-table/react-table.css";
import {useGetUserOwnedCompetitions} from "../../../api/userClient_v1";
import {useAuth} from "../../../utils/auth";
import {Table} from "../../../basicComponents/Table";
import {CompetitionListAdminBreadcrumbs} from "../../../organisms/breadcrumbs/CompetitionListAdminBreadcrumbs";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

export function CompetitionListAdmin() {
    const history = useHistory();
    const {user} = useAuth();

    const [state] = useGetUserOwnedCompetitions(user.id_user);

    const columns = [
        {
            Header: 'Název soutěže',
            accessor: 'name',
        },
        {
            Header: 'Sport',
            accessor: 'sport',
        },
        {
            Header: 'Město',
            accessor: 'city',
        },
        {
            Header: 'Typ',
            accessor: 'type',
        },
        {
            Header: 'Vedoucí soutěže',
            accessor: 'name_leader',
        }
    ];

    function handleClick(row) {
        if (row) {
            history.push("competitions/edit/" + row.original.id_competition);
        }
    }

    const header = (
        <div>
            <CompetitionListAdminBreadcrumbs/>
            <Heading>Moje soutěže</Heading>
            <div className="text-right">
                <Button variant="primary mb-3 pull-right" onClick={() => history.push("/administration/competitions/create")}>
                    <span>Vytvořit soutěž</span>
                </Button>
            </div>
        </div>
    );

    if(state.isLoading) {
        return <LoadingGif header={header}/>;
    }

    if(!state.isLoading && state.error) {
        return <DataLoadingError header={header}/>;
    }

    return (
        <div>
            {header}
            {(!state.isLoading && !state.error) ?
                <Table columns={columns} data={state.competition} filterable={false} showPagination={false}
                       getTdProps={(state, rowInfo) => {
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


