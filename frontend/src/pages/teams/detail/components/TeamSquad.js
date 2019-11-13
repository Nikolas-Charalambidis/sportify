import React from 'react';
import "react-table/react-table.css";
import {useHistory} from 'react-router-dom';
import {useGetMembers} from "../../../../api/team/teamClient_v1";
import {useParams} from "react-router-dom";
import {Heading} from "../../../../atoms";
import {Table} from "../../../../organisms/Table";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../assets/images/loading.gif";
import {useGetTeamPositions} from "../../../../api/others/othersClient_v1";

export function TeamSquad() {
    let {id_team} = useParams();
    const [state] = useGetMembers(id_team);
    const [positionsState] = useGetTeamPositions();

    let history = useHistory();
    const columns = [
        {
            Header: "Jméno",
            accessor: "name",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
        {
            Header: "Pozice",
            accessor: "position",
            Cell: ({row}) => (<span>{row.position}</span>),
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()),

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    {positionsState.positions.map((anObjectMapped, index) => (
                        <option value={anObjectMapped.position}>{anObjectMapped.position}</option>
                    ))}
                </select>
        }
    ];

    function handleClick(row) {
        if (row) {
            history.push("/user/" + row.original.id_user);
        }
    }

    return (
        <div>
            {(state.isLoading || positionsState.isLoading) && <div className="text-center"><Image src={loadingGif}/></div>}
            {(
                (!state.isLoading && state.error) ||
                (!positionsState.isLoading && positionsState.error))  &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(
                (!state.isLoading && !state.error) &&
                (!positionsState.isLoading && !positionsState.error)) &&
                <Table columns={columns} data={state.players} getTdProps={(state, rowInfo) => {
                    return {
                        onClick: () => {
                            handleClick(rowInfo);
                        }
                    }
                }}/>
            }
        </div>
    );
}
