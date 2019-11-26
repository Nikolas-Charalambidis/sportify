import React, {useState} from 'react';
import { Button, Modal, FormCheck } from 'react-bootstrap';
import { concat, equals, includes, without } from 'ramda';
import { Heading } from '../../../../atoms';
import { useGetMembers } from '../../../../api/teamClient_v1';
import { useGetTeamPositions } from '../../../../api/othersClient_v1';
import { Table } from '../../../../atoms/Table';
import {addPlayer} from "../../../../api/matchupClient_v1";

function getPlayers(state) {
  if (state[0].players) {
    return state[0].players;
  }
}

export function PlayerSelectModal({ show, handleClose, players }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);


  function onCheck(original) {
    if (
        selectedPlayers.map(player => equals(player.id_user, original.id_user)).includes(true)
    ) {
      const filteredArray = selectedPlayers.filter(item =>
        item.id_user !== original.id_user
      );
      setSelectedPlayers(filteredArray);
    } else {
      setSelectedPlayers([...selectedPlayers, original]);
    }
  }

  const columns = [
    {
      id: 'checkbox',
      accessor: '',
      filterable: false,
      width: 45,
      Cell: ({ original }) => (
          <input
              type="checkbox"
              className="checkbox"
              onChange={() => onCheck(original)}
              checked={
                selectedPlayers
                  .map(player => equals(player.id_user, original.id_user))
                  .includes(true)}
          />
      )
    },
    {
      Header: 'Jméno',
      accessor: 'name'
    }
  ];

  return (
    <Modal show={show} >
            <Modal.Header>
              <Modal.Title className="modal-title">
                <Heading size="md">Výběr hráčů do sestavy</Heading>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Table columns={columns} data={players} />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary"  type="button" block onClick={handleClose} >
                    Uložit
                </Button>
                <Button variant="secondary"  type="button" block onClick={handleClose} >
                  Zrušit
                </Button>
            </Modal.Footer>
    </Modal>
  );
}
