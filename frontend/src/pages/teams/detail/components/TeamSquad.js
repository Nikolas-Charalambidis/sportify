import React from 'react';
import "react-table/react-table.css";
import {useHistory} from 'react-router-dom';
import {useGetMembers} from "../../../../api/team/teamClient_v1";
import {useParams} from "react-router-dom";
import {Heading} from "../../../../atoms";
import {Table} from "../../../../organisms/Table";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../assets/images/loading.gif";

const positionEnum = {
    ATTACKER: 'attacker',
    DEFENDER: 'defender',
    GOALKEEPER: 'goalkeeper',
};

export function TeamSquad() {
    let {id_team} = useParams();
    const [state] = useGetMembers(id_team);

    let history = useHistory();
    const columns = [
        {
            Header: "Jméno",
            accessor: "name",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
        {
            Header: "Příjmení",
            accessor: "surname",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
        {
            Header: "Pozice",
            accessor: "position",
            filterMethod: (filter, row) => {
                switch (filter.value) {
                    case positionEnum.ATTACKER:
                        return row[filter.id] === positionEnum.ATTACKER;
                    case positionEnum.DEFENDER:
                        return row[filter.id] === positionEnum.DEFENDER;
                    case positionEnum.GOALKEEPER:
                        return row[filter.id] === positionEnum.GOALKEEPER;
                    default:
                        return true;
                }
            },
            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    <option value="attacker">Útočník</option>
                    <option value="defender">Obránce</option>
                    <option value="goalkeeper">Brankář</option>
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
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <Table columns={columns} data={state.team_data} getTdProps={(state, rowInfo) => {
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
