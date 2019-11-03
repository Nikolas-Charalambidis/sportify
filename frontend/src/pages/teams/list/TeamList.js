import React from 'react';
import { useHistory  } from 'react-router-dom';
import {Heading} from '../../../atoms';
import {Breadcrumb} from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { useGetTeams } from "../../../api/team/teamAPI";

export function TeamList() {
    const [state] = useGetTeams();
    let history = useHistory();

    function handleClick(row) {
        if (row) {
            history.push("/team/" + row.original.id_team);
        }
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Týmy</Breadcrumb.Item>
            </Breadcrumb>
            <Heading>Týmy</Heading>
            <div>
                <ReactTable
                    previousText="Předchozí"
                    nextText="Další"
                    pageText="Stránka"
                    ofText="z"
                    rowsText="řádků"
                    data={state.teams_data}
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
                    getTdProps={(state, rowInfo, column, instance) => {
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
    {
        Header: 'Leader',
        accessor: 'leader',
    },
];

