import React, {useState} from 'react';
import "react-table/react-table.css";
import {useHistory} from 'react-router-dom';
import {useGetTeamMembership} from "../../../api/teamClient_v1";
import {useParams} from "react-router-dom";
import {Heading} from "../../../atoms";
import {Table} from "../../../atoms/Table";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {useGetTeamPositions} from "../../../api/othersClient_v1";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

export function TeamSquad({status, admin}) {
    let {id_team} = useParams();
    const [state] = useGetTeamMembership(id_team, status);
    const [positionsState] = useGetTeamPositions();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ID, setID] = useState(null);

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
            show: (admin) ? true : false,
            Cell: row => {
                if(status === "active"){
                    return (
                        <div>
                            <Button variant="link" onClick={() => {
                                setID({id_matchup: row.original.id_matchup, id_user: row.original.id_user});
                                handleShow();
                            }}>
                                <FontAwesomeIcon className="removeIcon" icon={Icons.faTrashAlt} size="1x"/>
                            </Button>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Button variant="link" onClick={() => {
                                setID({id_matchup: row.original.id_matchup, id_user: row.original.id_user});
                                handleShow();
                            }}>
                                <FontAwesomeIcon className="addIcon" icon={Icons.faPlus} size="1x"/>
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
            {(state.isLoading || positionsState.isLoading) &&
            <div className="text-center"><Image src={loadingGif}/></div>}
            {(
                (!state.isLoading && state.error) ||
                (!positionsState.isLoading && positionsState.error)) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(
                (!state.isLoading && !state.error) &&
                (!positionsState.isLoading && !positionsState.error)) &&
            <Table className="defaultCursor" columns={columns} data={state.players}/>
            }
        </div>
    );
}
