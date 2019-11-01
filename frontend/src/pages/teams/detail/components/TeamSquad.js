import React from 'react'
import ReactTable from "react-table"
import "react-table/react-table.css"

const positionEnum = {
    STRIKER: 'striker',
    DEFENDER: 'defender',
    GOALKEEPER: 'goalkeeper',
}

export function TeamSquad({className, ...rest}) {
    const data = [
        {
            name: "Alice",
            surname: "fwqfqwf",
            position: "brankář",
        },
        {
            name: "Petr",
            surname: "ASDdqwd",
            position: "obránce",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
        {
            name: "Alice",
            surname: "fwqfqwf",
            position: "brankář",
        },
        {
            name: "Petr",
            surname: "ASDdqwd",
            position: "obránce",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
        {
            name: "Alice",
            surname: "fwqfqwf",
            position: "brankář",
        },
        {
            name: "Petr",
            surname: "ASDdqwd",
            position: "obránce",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
        {
            name: "Alice",
            surname: "fwqfqwf",
            position: "brankář",
        },
        {
            name: "Petr",
            surname: "ASDdqwd",
            position: "obránce",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
        {
            name: "Alice",
            surname: "fwqfqwf",
            position: "brankář",
        },
        {
            name: "Petr",
            surname: "ASDdqwd",
            position: "obránce",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
        {
            name: "Alice",
            surname: "Novakova",
            position: "útočník",
        },
        {
            name: "Petr",
            surname: "Starý",
            position: "brankář",
        },
    ]

    console.log(data)


    return (
        <div>
            <ReactTable
                previousText="Předchozí"
                nextText="Další"
                pageText="Stránka"
                ofText="z"
                rowsText="řádků"
                rows
                data={data}
                filterable
                defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                columns={[
                    {
                        columns: [
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
                                    switch(filter.value){
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
								Filter: ({ filter, onChange }) =>
									<select
										onChange={event => onChange(event.target.value)}
										style={{ width: "100%" }}
										value={filter ? filter.value : "all"}
									>
										<option value="all">Vše</option>
										<option value="striker">Útočník</option>
										<option value="defender">Obránce</option>
										<option value="goalkeeper">Brankář</option>
									</select>
							}
                        ]
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        </div>
    )
}
