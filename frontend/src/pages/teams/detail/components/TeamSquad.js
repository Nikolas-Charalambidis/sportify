import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {useHistory} from 'react-router-dom';
import {useGetMembers} from "../../../../api/team/teamClient_v1";
import {useParams} from "react-router-dom";
import {Heading} from "../../../../atoms";

const positionEnum = {
    ATTACKER: 'attacker',
    DEFENDER: 'defender',
    GOALKEEPER: 'goalkeeper',
};

export function TeamSquad() {
    let {id_team} = useParams();
    const [state] = useGetMembers(id_team);
    let history = useHistory();

    function handleClick(row) {
        if (row) {
            history.push("/user/" + row.original.id_user);
        }
    }

    return (
        <div>
            {state.isLoading && <div>Načítám data...</div>}
            {!state.isLoading && state.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!state.isLoading && !state.error && (
                <ReactTable
                    previousText="Předchozí"
                    nextText="Další"
                    pageText="Stránka"
                    ofText="z"
                    rowsText="řádků"
                    noDataText="Nenalezená žádná data"
                    rows
                    data={state.players}
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
                    columns={[{columns}]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    getTdProps={(state, rowInfo) => {
                        return {
                            onClick: () => {
                                handleClick(rowInfo);
                            }
                        }
                    }}
                />
            )}
        </div>
    );
}

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