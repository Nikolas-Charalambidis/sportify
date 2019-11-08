import React from 'react';
import { useHistory } from 'react-router-dom';
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
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item href="/administration">Administrace</Breadcrumb.Item>
                <Breadcrumb.Item active>Moje týmy</Breadcrumb.Item>
            </Breadcrumb>
            <Heading>Moje tymy</Heading>
            <div>
                <ReactTable
                    previousText="Předchozí"
                    nextText="Další"
                    pageText="Stránka"
                    ofText="z"
                    rowsText="řádků"
                    data={state.user_data}
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

