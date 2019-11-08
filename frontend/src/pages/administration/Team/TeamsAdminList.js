import React from 'react';
import {NavLink as Link, useHistory} from 'react-router-dom';
import { Heading } from '../../../atoms';
import { Breadcrumb } from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {useGetUserOwnedTeams} from "../../../api/user/userClient_v1";
import {useAuth} from "../../../utils/auth";

export function TeamsAdminList() {
    const { user } = useAuth();
    const [state] = useGetUserOwnedTeams(user.id_user);
    let history = useHistory();

    function handleClick(row) {
        if (row) {
            history.push("teams/" + row.original.id_team);
        }
    }

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item">
                    <Link to="/">Domů</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/administration">Administrace</Link>
                </li>
                <li className="breadcrumb-item">
                    <span className="active">Moje týmy</span>
                </li>
            </Breadcrumb>
            <Heading>Moje týmy</Heading>
            <div>
                <ReactTable
                    previousText="Předchozí"
                    nextText="Další"
                    pageText="Stránka"
                    ofText="z"
                    rowsText="řádků"
                    data={state.teams}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        row[filter.id].startsWith(filter.value)}
                    defaultSortMethod={(a, b) => {
                        if (a === b) {
                            return 0;
                        }
                        const aReverse = a.split("").reverse().join("");
                        const bReverse = b.split("").reverse().join("");
                        return aReverse > bReverse ? 1 : -1;
                    }}
                    noDataText="Žádná data"
                    defaultPageSize={10}
                    columns={columns}
                    getTdProps={(state, rowInfo) => {
                        return {
                            onClick: (e) => {
                                handleClick(rowInfo);
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

const columns = [
    {
        Header: 'Nazev tymu',
        accessor: 'name',
    },
    {
        Header: 'Sport',
        accessor: 'sport',
    },
];

