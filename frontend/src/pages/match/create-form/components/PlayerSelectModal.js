import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import React from "react";
import {Heading} from '../../../../atoms';
import * as yup from "yup";
import { useGetMembers } from "../../../../api/team/teamClient_v1";
import { useGetTeamPositions } from "../../../../api/others/othersClient_v1";
import { Table } from "../../../../organisms/Table";

let selectedPlayers = [];

function getPlayers(state) {    
    if (state[0].players) {
        return state[0].players;
    }
};

function onCheck(original) {
    //přidá nebo odebere hráče
    if (selectedPlayers.find(p => p.id === original.id_user)) {
        selectedPlayers = selectedPlayers.filter(p => p.id !== original.id_user);
    } else {
        let addPlayer = new Checked(original.id_user, true);
        selectedPlayers.push(addPlayer);
    }
};

const schemaCreateTeam = yup.object().shape({
   
});

export function PlayerSelectModal({ show, handleClose, id_team, handleClosePlayers }) {
    //vyřešit volání useGetMembers
    const state = useGetMembers(id_team);
    const players = getPlayers(state);
    const [positionsState] = useGetTeamPositions();
    console.log(players);

    const columns = [
        {
            id: "checkbox",
            accessor: "",
            Cell: ({ original }) => {
                return (
                    <input type="checkbox" className="checkbox" onChange={() => onCheck(original)}/>
                );
            },
            width: 45
        },
        {
            Header: "Jméno",
            accessor: "name",
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
        {
            Header: "Pozice",
            accessor: "position",
            Cell: ({ row }) => (<span>{row.position}</span>),
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    return row[filter.id] === filter.value;
                }
            },

            Filter: ({ filter, onChange }) =>
                <select onChange={event => onChange(event.target.value)} style={{ width: "100%" }} value={filter ? filter.value : "all"}>
                    <option value="all">Vše</option>
                    {positionsState.positions.map((anObjectMapped, index) => (
                        <option key={index} value={anObjectMapped.position}>{anObjectMapped.position}</option>
                    ))}
                </select>
        }
    ];

    return (
        <Modal show={show} onHide={handleClose}>
            <div>
                {state.isLoading && <div>Načítám data...</div>}
                {(!state.isLoading && state.error) && <div>Data se nepodařilo načíst</div>}
                {(!state.isLoading && !state.error) &&
                <Formik
                    validationSchema={schemaCreateTeam}
                    initialValues={{

                    }}
                >{({handleSubmit, setFieldValue, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Header>
                            <Modal.Title className="modal-title">
                                <Heading size="md">Vytvoření týmu</Heading>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                                <Table columns={columns} data={players} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" type="button" onClick={() => handleClosePlayers(selectedPlayers)}>Uložit</Button>
                            <Button variant="secondary" type="button" onClick={handleClose}>Zavřít</Button>
                        </Modal.Footer>
                    </Form>
                )}
                </Formik>
                }
           </div>
        </Modal>
    )
}

export class Checked {
    constructor(id, checked) {
        this.id = id;
        this.checked = checked;
    }
}