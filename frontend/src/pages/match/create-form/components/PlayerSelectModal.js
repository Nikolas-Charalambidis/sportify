import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { concat, equals, includes, without } from 'ramda';
import { Heading } from '../../../../atoms';
import { useGetMembers } from '../../../../api/teamClient_v1';
import { useGetTeamPositions } from '../../../../api/othersClient_v1';
import { Table } from '../../../../atoms/Table';

function getPlayers(state) {
  if (state[0].players) {
    return state[0].players;
  }
}

export function PlayerSelectModal({ show, handleClose, state, setter }) {
  const members = useGetMembers(state.id);
  const players = getPlayers(members);
  const [positionsState] = useGetTeamPositions();

  function onCheck(original) {
    if (includes({ player: original, checked: true }, state.players)) {
      setter({
        ...state,
        players: without([{ player: original, checked: true }], state.players),
      });
    } else {
      let newPlayers = concat(state.players, [
        { player: original, checked: true },
      ]);
      setter({ id: state.id, players: newPlayers });
    }
  }

  function onCheckAll() {
    if (state.players.length === players.length) {
      setter({ id: state.id, players: [] });
    } else {
      setter({
        id: state.id,
        players: players.map(player => {
          return { player: player, checked: true };
        }),
      });
    }
  }

  const columns = [
    {
      id: 'checkbox',
      accessor: '',
      filterable: false,
      Header: () => (
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => onCheckAll()}
          checked={players && state.players.length === players.length}
        />
      ),
      Cell: ({ original }) => (
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => onCheck(original)}
          checked={state.players
            .map(player => equals(player.player, original))
            .includes(true)}
        />
      ),
      width: 45,
    },
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

  return (
    <Modal show={show} onHide={handleClose}>
      <div>
        {state.isLoading && <div>Načítám data...</div>}
        {!state.isLoading && state.error && (
          <div>Data se nepodařilo načíst</div>
        )}
        {!state.isLoading && !state.error && (
          <>
            <Modal.Header>
              <Modal.Title className="modal-title">
                <Heading size="md">Vytvoření týmu</Heading>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Table columns={columns} data={players} />
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="primary"
                type="button"
                block
                onClick={handleClose}
              >
                Uložit
              </Button>
            </Modal.Footer>
          </>
        )}
      </div>
    </Modal>
  );
}
