import React, {useState} from 'react';
import "react-table/react-table.css";
import {useHistory} from 'react-router-dom';
import {Heading} from "../../../atoms";
import {Table} from "../../../atoms/Table";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {useGetTeamPositions} from "../../../api/othersClient_v1";
import {changePlayerStatus} from "../../../api/teamMembershipClient_v1";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {useApi} from "../../../hooks/useApi";
import {DeleteModal} from "../../../atoms/DeleteModal";



export function TeamSquad({status, admin, playersState, fetchActivePlayersState, fetchInactivePlayersState, fetchPlayersPendingState, fetchPlayersDeclinedState}) {
    const api = useApi();

    const [positionsState] = useGetTeamPositions();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ID, setID] = useState(null);

    const handleUpdatePlayers = async () => {
        const result = await changePlayerStatus(api, ID.id_team, ID.id_user, ID.status);
        if(result) {
            fetchActivePlayersState();
            fetchInactivePlayersState();
            fetchPlayersPendingState();
            fetchPlayersDeclinedState();

        }
    };


    

    let history = useHistory();
    const columns = [
        {
            Header: "Jméno",
            accessor: "name",
            style: {cursor: "pointer"},
            Cell: ({ row }) => (  <div onClick={() => {handleClick(row)}}>{row.name}</div> ),
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
        },
        {
            Header: "Pozice",
            accessor: "position",
            Cell: ({row}) => (<span>{row.position}</span>),
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    return row[filter.id] === filter.value;
                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    {positionsState.positions.map((anObjectMapped, index) => (
                        <option key={index} value={anObjectMapped.position}>{anObjectMapped.position}</option>
                    ))}
                </select>
        },
        {

            Header: 'Akce',
            accessor: "id_matchup",
            filterable: false,
            show: !!(admin),
            Cell: row => {
                if (status === "active"){
                    return (
                        <div>
                            <Button variant="link" onClick={ () => {
                                setID({id_team: row.original.id_team, id_user: row.original.id_user, status: "inactive"});
                                handleShow();
                            }}>
                                <FontAwesomeIcon className="removeIcon" icon={Icons.faTrashAlt} size="1x"/>
                            </Button>
                        </div>
                    )
                } else if (status === "inactive") {
                    return (
                        <div>
                            <Button variant="link" onClick={ () => {
                                setID({id_team: row.original.id_team, id_user: row.original.id_user, status: "active"});
                                handleShow();
                            }}>
                                <FontAwesomeIcon className="addIcon" icon={Icons.faPlus} size="1x"/>
                            </Button>
                        </div>
                    )
                } else if (status === "pending") {
                    return (
                        <div>
                            <Button variant="primary" onClick={() => {
                                setID({id_team: row.original.id_team, id_user: row.original.id_user, status: "active"});
                                handleShow();
                            }}>
                                Schválit
                            </Button>
                            <Button variant="danger" onClick={ () => {
                                setID({id_team: row.original.id_team, id_user: row.original.id_user, status: "declined"});
                                handleShow();
                            }}>
                                Zamítnout
                            </Button>
                        </div>
                    )
                } else if (status === "declined") {
                    return (
                        <div>
                            <Button variant="primary" onClick={() => {
                                setID({id_team: row.original.id_team, id_user: row.original.id_user, status: "pending"});
                                handleShow();
                            }}>
                                Schválit
                            </Button>
                        </div>
                    )
                }

            }
        }
    ];

    function handleClick(row) {
        if (row) {
            history.push("/users/" + row._original.id_user);
        }
    }
    
    return (
        <div>
            {(playersState.isLoading || positionsState.isLoading) &&
            <div className="text-center"><Image src={loadingGif}/></div>}
            {(
                (!playersState.isLoading && playersState.error) ||
                (!positionsState.isLoading && positionsState.error)) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(
                (!playersState.isLoading && !playersState.error) &&
                (!positionsState.isLoading && !positionsState.error)) &&
            <Table className="defaultCursor" columns={columns} data={playersState.players}/>


            }
            <DeleteModal key="players" show={show} heading="Delete hráče ze zápasu"
                         text="Opravdu si přejete odstranit hráče ze zápasu a tím i všechny eventy, na které je navázán?"
                         handleClose={handleClose} deleteFunction={handleUpdatePlayers} idItem={ID}/>
        </div>
    );
}
