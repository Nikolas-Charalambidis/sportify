import React from 'react';
import {NavLink as Link, useHistory} from 'react-router-dom';
import {Heading} from '../../../atoms';
import {Breadcrumb} from "react-bootstrap";
import "react-table/react-table.css";
import {useGetUserOwnedTeams} from "../../../api/user/userClient_v1";
import {useAuth} from "../../../utils/auth";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {Table} from "../../../organisms/Table";

export function TeamsAdminList() {
    const {user} = useAuth();
    const [state] = useGetUserOwnedTeams(user.id_user);

    let history = useHistory();
    const columns = [
        {
            Header: "#",
            width: 50,
            accessor: "rank",
            Cell: (playerData) => getPosition(playerData),
        },
        {
            Header: 'Název týmu',
            accessor: 'name',
        },
        {
            Header: 'Sport',
            accessor: 'sport',
        },
    ];

    function handleClick(row) {
        if (row) {
            history.push("teams/" + row.original.id_team);
        }
    }

    function getPosition(playerData) {
        return (Number(playerData.index) + 1).toString();
    }

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
                <li className="breadcrumb-item"><span className="active">Moje týmy</span></li>
            </Breadcrumb>

            <Heading>Moje týmy</Heading>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <Table columns={columns} data={state.user_data} filterable={false} showPagination={false}
                       getTdProps={(state, rowInfo) => {
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


