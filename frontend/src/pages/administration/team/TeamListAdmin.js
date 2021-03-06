import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Heading} from '../../../basicComponents';
import {Button} from "react-bootstrap";
import "react-table/react-table.css";
import {useGetUserOwnedTeams} from "../../../api/userClient_v1";
import {useAuth} from "../../../utils/auth";
import {Table} from "../../../basicComponents/Table";
import {TeamCreateModal} from "../../../organisms/team/admin/TeamCreateModal";
import {useApi} from "../../../hooks/useApi";
import {TeamListAdminBreadcrumbs} from "../../../organisms/breadcrumbs/TeamListAdminBreadcrumbs";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

export function TeamListAdmin() {
    const api = useApi();
    const history = useHistory();
    const {user} = useAuth();

    const [state] = useGetUserOwnedTeams(user.id_user);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const columns = [
        {
            Header: 'Název týmu',
            accessor: 'name',
        },
        {
            Header: 'Sport',
            accessor: 'sport',
        },
        {
            Header: 'Typ',
            accessor: 'type',
        },
    ];

    function handleClick(row) {
        if (row) {
            history.push("teams/" + row.original.id_team);
        }
    }

    const header = (
        <div>
            <TeamListAdminBreadcrumbs />
            <Heading>Moje týmy</Heading>
            <div className="text-right">
                <Button variant="primary mb-3 pull-right" onClick={handleShow}>
                    <span>Vytvořit tým</span>
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
            {!state.isLoading && !state.error ?
                <Table columns={columns} data={state.teams} filterable={false} showPagination={false}
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

            <TeamCreateModal show={show} id_user={user.id_user} api={api} handleClose={handleClose}/>
        </div>
    );
}


