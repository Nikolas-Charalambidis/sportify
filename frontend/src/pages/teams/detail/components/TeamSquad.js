import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {useHistory} from 'react-router-dom';
import {useGetMembers} from "../../../../api/team/teamClient_v1";

const positionEnum = {
    STRIKER: 'striker',
    DEFENDER: 'defender',
    GOALKEEPER: 'goalkeeper',
};

export function TeamSquad() {
    const [state] = useGetMembers(1);
    let history = useHistory();

    console.log(state)

    return (
        <div>
            {console.log(state.team_data)}
            <ReactTable
                previousText="Předchozí"
                nextText="Další"
                pageText="Stránka"
                ofText="z"
                rowsText="řádků"
                noDataText="Nenalezená žádná data"
                rows
                data={state.team_data}
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
                columns={columns}
                defaultPageSize={10}
                className="-striped -highlight"
            />
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
        id: "over",
        filterMethod: (filter, row) => {
            switch (filter.value) {
                case positionEnum.STRIKER:
                    return row[filter.id] === "útočník";
                case positionEnum.DEFENDER:
                    return row[filter.id] === "obránce";
                case positionEnum.GOALKEEPER:
                    return row[filter.id] === "brankář";
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
                <option value="striker">Útočník</option>
                <option value="defender">Obránce</option>
                <option value="goalkeeper">Brankář</option>
            </select>
    }
];