import React from 'react';
import {NavLink as Link, useHistory} from 'react-router-dom';
import {Heading} from '../../../basicComponents';
import {Breadcrumb, Button} from "react-bootstrap";
import "react-table/react-table.css";
import {useGetUserOwnedCompetitions} from "../../../api/userClient_v1";
import {useAuth} from "../../../utils/auth";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {Table} from "../../../basicComponents/Table";

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
    ];

    function handleClick(row) {
        if (row) {
            history.push("competitions/" + row.original.id_competition);
        }
    }

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><Link to="/administration">Administrace</Link></li>
                <li className="breadcrumb-item"><span className="active">Moje soutěže</span></li>
            </Breadcrumb>

            <Heading>Moje soutěže</Heading>
            <div className="text-right">
                <Button variant="primary mb-3 pull-right" onClick={() => history.push("/administration/competitions/create")}>
                    <span>Vytvořit soutěž</span>
                </Button>
            </div>

            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <Table columns={columns} data={state.competition} filterable={false} showPagination={false}
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


