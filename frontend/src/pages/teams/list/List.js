import React from 'react'

import {Heading} from '../../../atoms'
import {Breadcrumb} from "react-bootstrap"
import ReactTable from "react-table"
import "react-table/react-table.css"

export function List() {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Týmy</Breadcrumb.Item>
            </Breadcrumb>
            <Heading>Týmy</Heading>
            <div>
                <ReactTable
                    data={teams}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        row[filter.id].startsWith(filter.value)}
                    defaultSortMethod={(a, b) => {
                        if (a === b) {
                            return 0
                        }
                        const aReverse = a.split("").reverse().join("")
                        const bReverse = b.split("").reverse().join("")
                        return aReverse > bReverse ? 1 : -1
                    }}
                    noDataText="Nejsou data"
                    defaultPageSize={10}
                    columns={columns}
                />
            </div>
        </div>

    )
}

const columns = [
    {
        Header: 'Nazev tymu',
        accessor: 'nazevTymu',
    },
    {
        Header: 'Kod',
        accessor: 'kod',
    },
    {
        Header: 'Vedouci',
        accessor: 'vedouci',
    },
    {
        Header: 'Trener',
        accessor: 'trener',
    },
    {
        Header: 'Web',
        accessor: 'web',
    }
]

const teams = [
    {
        nazevTymu: 'Vojta',
        kod: 'LAB',
        vedouci: 'Standa',
        trener: 'Petr',
        web: 'www.rab.cz'
    },
    {
        nazevTymu: 'Aomas',
        kod: 'RAB',
        vedouci: 'Standa',
        trener: 'Petr',
        web: 'www.rab.cz'
    },
    {
        nazevTymu: 'Tolas',
        kod: 'CAB',
        vedouci: 'Standa',
        trener: 'Petr',
        web: 'www.rab.cz'
    },
    {
        nazevTymu: 'Tomas',
        kod: 'RAB',
        vedouci: 'Standa',
        trener: 'Petr',
        web: 'www.rab.cz'
    },
    {
        nazevTymu: 'pomas',
        kod: 'RAB',
        vedouci: 'Standa',
        trener: 'Petr',
        web: 'www.rab.cz'
    },
    {
        nazevTymu: 'Tomas',
        kod: 'RAB',
        vedouci: 'Standa',
        trener: 'Petr',
        web: 'www.rab.cz'
    },
    {
        nazevTymu: 'gomas',
        kod: 'RAB',
        vedouci: 'Standa',
        trener: 'Petr',
        web: 'www.rab.cz'
    },
]

