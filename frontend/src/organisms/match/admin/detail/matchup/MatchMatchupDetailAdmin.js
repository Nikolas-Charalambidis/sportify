import React, {useState} from 'react';
import {Table} from "../../../../../atoms/Table";
import {useApi} from "../../../../../hooks/useApi";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../../assets/images/loading.gif";
import {Heading} from "../../../../../atoms";
import Button from "react-bootstrap/Button";
import {AddGoalSuspensionModal} from "../../base/AddGoalSuspensionModal";
import {addPlayer, deletePlayer, setGoalkeeper} from "../../../../../api/matchupClient_v1";
import {DeleteModal} from "../../../../../atoms/DeleteModal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {PlayerSelectModal} from "../../create/PlayerSelectModal";
import {addEvent} from "../../../../../api/eventClient_v1";

export function MatchMatchupDetailAdmin({id_team, id_match, host, availablePlayers, fetchAvailablePlayers, matchupState, fetchMatchup, fetchEvents}) {
    const api = useApi();

    const [showGoalModal, setShowGoalModal] = useState({ show: false });
    const closeGoalSuspensionModal = () => setShowGoalModal(false);
    const openGoalSuspensionModal = (id_user) => setShowGoalModal({
        show: true,
        id_user: id_user
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ID, setID] = useState(null);

    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const handleClosePlayerModal = () => setShowPlayerModal(false);
    const handleShowPlayerModal = () => setShowPlayerModal(true);

    const columnsMatchup = [
        {
            Header: "Hráč",
            accessor: "name"
        },
        {
            accessor: "goalkeeper",
            Header: "Brankář",
            Cell: row => (
                <div>
                    {row.original.goalkeeper ? <span>Ano</span> : <span>Ne&nbsp;</span>}
                    <Button variant="link" onClick={async () => {
                        const result = await setGoalkeeper(api, row.original.id_matchup, row.original.goalkeeper)
                        if(result){
                            fetchMatchup();
                        }
                    }}
                    >
                        Změnit
                    </Button>
                </div>
            ),
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    return row[filter.id] === Number(filter.value);
                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    <option value={1}>Ano</option>
                    <option value={0}>Ne</option>
                </select>
        },
        {
            Header: 'Akce',
            accessor: "id_matchup",
            filterable: false,
            Cell: row => (
                <div>
                    <Button variant="link" onClick={() => openGoalSuspensionModal(row.original.id_user)}>
                        <FontAwesomeIcon className="addIcon" icon={Icons.faPlus} size="1x"/>
                    </Button>
                    <Button variant="link" onClick={() => {
                        setID({id_matchup: row.original.id_matchup, id_user: row.original.id_user});
                        handleShow();
                    }}>
                        <FontAwesomeIcon className="removeIcon" icon={Icons.faTrashAlt} size="1x"/>
                    </Button>
                </div>
            )
        }
    ];

    const handleAddPlayers = async (players) => {
        const result = await addPlayer(api, id_match, host, players);
        if(result) {
            fetchMatchup();
            fetchAvailablePlayers();
        }
    };

    const handleDeletePlayer = async (id) => {
        const result = await deletePlayer(api, id.id_matchup, id.id_user);
        if(result) {
            fetchMatchup();
            fetchAvailablePlayers();
            fetchEvents();
        }
    };

    const handleAddEvent = async (values) => {
        const result = await addEvent(api, values);
        if(result) {
            fetchEvents();
        }
    };

    return (
        <div>
            {matchupState.isLoading &&  <div className="text-center"><Image src={loadingGif}/></div>}
            {(!matchupState.isLoading && matchupState.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!matchupState.isLoading && !matchupState.error) &&
                <div>
                    { availablePlayers.isLoading &&  <div className="text-center"><Image src={loadingGif}/></div>}
                    {(!availablePlayers.isLoading && availablePlayers.error) &&
                        <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>
                    }
                    {(!availablePlayers.isLoading && !availablePlayers.error && availablePlayers.players.length === 0) &&
                        <Heading size="xs" className="alert-warning pt-2 pb-2 mt-2 text-center">Nejsou dostupní žádní další hráči</Heading>
                    }
                    {(!availablePlayers.isLoading && !availablePlayers.error && availablePlayers.players.length !== 0) &&
                        <div>
                            <Button variant="primary" onClick={handleShowPlayerModal}>
                                Vybrat hráče do sestavy
                            </Button>
                            <PlayerSelectModal type="edit" show={showPlayerModal}
                                                handleClose={handleClosePlayerModal}
                                                players={availablePlayers.players}
                                                handleAddPlayers={handleAddPlayers}
                            />
                        </div>
                    }

                    <Table className="defaultCursor" columns={columnsMatchup} data={matchupState.matchup}/>

                    <AddGoalSuspensionModal params={showGoalModal} handleClose={closeGoalSuspensionModal} matchup={matchupState.matchup}
                                            id_team={id_team} id_match={id_match} host={host} fetchEvents={fetchEvents}
                                            handleAddEvent={handleAddEvent}
                    />
                    <DeleteModal key="players" show={show} heading="Delete hráče ze zápasu"
                                 text="Opravdu si přejete odstranit hráče ze zápasu a tím i všechny eventy, na které je navázán?"
                                 handleClose={handleClose} deleteFunction={handleDeletePlayer} idItem={ID}/>

                </div>
            }
        </div>
    );

}
