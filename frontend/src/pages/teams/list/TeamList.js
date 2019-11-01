import React from 'react';

import {Heading, MainSection} from '../atoms/';
import {TopNavigation} from '../organisms/TopNavigation';
import {Breadcrumb} from "react-bootstrap";
import {Footer} from "../organisms/Footer";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {useGetTeams} from "../api/teams/teamsAPI";

export function Teams() {
    const [state] = useGetTeams();
    return (
        <div>
            <TopNavigation/>
            <MainSection>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                    <Breadcrumb.Item active>Týmy</Breadcrumb.Item>
                </Breadcrumb>
                <Heading>Týmy</Heading>
                <div>
                    <ReactTable
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
                        noDataText="Nejsou data"
                        defaultPageSize={10}
                        columns={columns}
                    />
                </div>
            </MainSection>
            <Footer/>
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
]

