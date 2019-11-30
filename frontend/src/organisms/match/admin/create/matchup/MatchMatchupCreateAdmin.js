import React, {useState} from 'react';
import {Table} from "../../../../../atoms/Table";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../../assets/images/loading.gif";
import {Heading} from "../../../../../atoms";
import Button from "react-bootstrap/Button";
import {PlayerSelectModal} from "../../create/PlayerSelectModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {AddGoalSuspensionModal} from "../../base/AddGoalSuspensionModal";
import {DeleteModal} from "../../../../../atoms/DeleteModal";

export function MatchMatchupCreateAdmin({interactive, host, availablePlayers, setAvailablePlayers, state, setState }) {

    const [showGoalModal, setShowGoalModal] = useState({ show: false });
    const closeGoalSuspensionModal = () => setShowGoalModal(false);
    const openGoalSuspensionModal = (id_user) => setShowGoalModal({
        show: true,
        id_user: id_user
    });

    const [nameState, setNameState] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ID, setID] = useState(null);

    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const handleClosePlayerModal = () => setShowPlayerModal(false);
    const handleShowPlayerModal = () => setShowPlayerModal(true);
    console.log(interactive)
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
                    <Button variant="link" onClick={() => {
                        const {id_team, shots, events} = state;
                        setState({
                            id_team: id_team,
                            shots: shots,
                            events: events,
                            matchups: state.matchups.map(item => (item.id_user === row.original.id_user ?
                                    {...item, goalkeeper: (!row.original.goalkeeper)} : item
                            ))
                        })
                    }}
                    >
                        Změnit
                    </Button>
                </div>
            ),
        },
        {
            Header: 'Akce',
            accessor: "id_matchup",
            filterable: false,
            Cell: row => (
                <div>
                    {!interactive &&
                    <Button variant="link" onClick={() => {
                        setNameState(row.original.name);
                        openGoalSuspensionModal(row.original.id_user);

                    }}>
                        {!interactive && <FontAwesomeIcon className="addIcon" icon={Icons.faPlus} size="1x"/>}
                    </Button>
                    }

                    <Button variant="link" onClick={() => {
                        setID(row.original.id_user);
                        handleShow();
                    }}>
                        <FontAwesomeIcon className="removeIcon" icon={Icons.faTrashAlt} size="1x"/>
                    </Button>
                </div>
            )
        }
    ];

    const handleAddPlayers = async (players) => {
        const {id_team, matchups, events, shots} = state;
        setState({
            id_team: id_team,
            matchups: matchups.concat(players),
            events: events,
            shots: shots
        });
        setAvailablePlayers({
            isLoading: false,
            error: false,
            players: availablePlayers.players.filter(item =>
                players.every( item2 => item2.id_user !== item.id_user)
            )
        });
        window.flash("Hráči byli přidání do sestavy", "success")
    };

    const handleDeletePlayer = (id) => {
        const {id_team, shots, events, matchups} = state;
        const player = matchups.filter(item => (item.id_user === id &&
            {id_user: item.id_user, name: item.name}
        ));
        setAvailablePlayers({
            isLoading: false,
            error: false,
            players:
                [...availablePlayers.players, player[0]]
        });
        setState({
            id_team: id_team,
            shots: shots,
            events: events.filter(item => item.id_user !== id),
            matchups: matchups.filter(item => item.id_user !== id)
        });
        window.flash("Hráč byl odstraněn ze sestavy a s ním i všechny náležité eventy", "success")
    };

    const handleAddEvent = (values) => {
        const {id_team, matchups, events, shots} = state;
        setState({
            id_team: id_team,
            matchups: matchups,
            events: [...events, {...values, name: nameState}],
            shots: shots
        });
        window.flash("Event byl úspěšně přidán", "success")
    };

    return (
        <div>
            {availablePlayers.isLoading &&  <div className="text-center"><Image src={loadingGif}/></div>}
            {(!availablePlayers.isLoading && availablePlayers.error) &&
                <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>
            }
            {(!availablePlayers.isLoading && !availablePlayers.error && availablePlayers.players.length === 0) &&
                <Heading size="xs" className="alert-warning pt-2 pb-2 mt-2 text-center">Nejsou dostupní žádní další hráči</Heading>
            }
            {(!availablePlayers.isLoading && !availablePlayers.error && availablePlayers.players.length !== 0) &&
                <div>
                    <Button variant="primary mb-3" onClick={handleShowPlayerModal}>
                        Vybrat hráče do sestavy
                    </Button>
                    <PlayerSelectModal type="create" show={showPlayerModal}
                                        handleClose={handleClosePlayerModal}
                                        players={availablePlayers.players}
                                        handleAddPlayers={handleAddPlayers}
                    />
                </div>
            }

            <Table className="defaultCursor" columns={columnsMatchup} data={state.matchups}/>

            <AddGoalSuspensionModal id_team={state.id_team} host={host}
                                    params={showGoalModal} handleClose={closeGoalSuspensionModal} matchup={state.matchups}
                                    handleAddEvent={handleAddEvent}
            />
            <DeleteModal key="players" show={show} heading="Delete hráče ze zápasu"
                         text="Opravdu si přejete odstranit hráče ze zápasu a tím i všechny eventy, na které je navázán?"
                         handleClose={handleClose} deleteFunction={handleDeletePlayer} idItem={ID}/>
        </div>
    );

}
