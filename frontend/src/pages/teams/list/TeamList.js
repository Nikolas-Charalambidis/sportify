import React from 'react';
import {NavLink as Link, useHistory} from 'react-router-dom';
import {Heading} from '../../../atoms';
import {Breadcrumb} from "react-bootstrap";
import {useGetTeams} from "../../../api/team/teamClient_v1";
import "react-table/react-table.css";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {Table} from "../../../organisms/Table";

export function TeamList() {
    const [state] = useGetTeams();
    let history = useHistory();

    function handleClick(row) {
        if (row) {
            history.push("/teams/" + row.original.id_team);
        }
    }

    const columns = [
        {
            Header: "Název týmu",
            accessor: "name",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
        {
            Header: "Sport",
            accessor: "sport",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
        {
            Header: "Vedoucí",
            accessor: "leader",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        }
    ];

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                <li className="breadcrumb-item"><span className="active">Týmy</span></li>
            </Breadcrumb>
            <Heading>Přehled týmů</Heading>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <Table columns={columns} data={state.teams_data} getTdProps={(state, rowInfo) => {
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