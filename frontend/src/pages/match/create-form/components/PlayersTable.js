import React from 'react';
import 'react-table/react-table.css';
import { useHistory } from 'react-router-dom';
import { Heading } from '../../../../atoms';
import { Table } from '../../../../organisms/Table';
import Image from 'react-bootstrap/esm/Image';
import loadingGif from '../../../../assets/images/loading.gif';
import { useGetTeamPositions } from '../../../../api/others/othersClient_v1';

export function PlayersTable(state) {
  const remappedState = state.state.players.map(item => item.player);
  const [positionsState] = useGetTeamPositions();
  let history = useHistory();

  const columns = [
    {
      Header: 'Jméno',
      accessor: 'name',
      filterMethod: (filter, row) =>
        row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()),
    },
    {
      Header: 'Pozice',
      accessor: 'position',
      Cell: ({ row }) => <span>{row.position}</span>,
      filterMethod: (filter, row) => {
        if (filter.value === 'all') {
          return true;
        } else {
          return row[filter.id] === filter.value;
        }
      },

      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: '100%' }}
          value={filter ? filter.value : 'all'}
        >
          <option value="all">Vše</option>
          {positionsState.positions.map((anObjectMapped, index) => (
            <option key={index} value={anObjectMapped.position}>
              {anObjectMapped.position}
            </option>
          ))}
        </select>
      ),
    },
  ];

  function handleClick(row) {
    if (row) {
      history.push('/users/' + row.original.id_user);
    }
  }

  const withPositions = !positionsState.isLoading && !positionsState.error;
  const withError =
    (!state.isLoading && state.error) ||
    (!positionsState.isLoading && positionsState.error);

  return (
    <div>
      {(state.isLoading || positionsState.isLoading) && (
        <div className="text-center">
          <Image src={loadingGif} />
        </div>
      )}
      {withError && (
        <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">
          Data se nepodařilo načíst
        </Heading>
      )}
      {remappedState && withPositions && (
        <Table
          columns={columns}
          data={remappedState}
          getTdProps={(state, rowInfo) => {
            return {
              onClick: () => {
                handleClick(rowInfo);
              },
            };
          }}
        />
      )}
    </div>
  );
}
