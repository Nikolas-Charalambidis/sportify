import React, {useState} from 'react';
import {Table} from "../../../../../organisms/Table";
import {CustomSelect} from "../../../../../atoms/Select";
import {useApi} from "../../../../../hooks/useApi";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../../assets/images/loading.gif";
import {Heading} from "../../../../../atoms";
import Button from "react-bootstrap/Button";
import deleteIcon from "../../../../../assets/images/delete.png";
import addIcon from "../../../../../assets/images/add.png";
import {AddGoalSuspensionModal} from "../events/AddGoalSuspensionModal";
import {addPlayer, deletePlayer, setGoalkeeper} from "../../../../../api/matchup/matchupClient_v1";

export function Matchup({id_team, id_match, host, availablePlayers, fetchAvailablePlayers, matchupState, fetchMatchup, fetchEvents}) {
    const api = useApi();

    const [showGoalModal, setShowGoalModal] = useState({ show: false });
    const closeGoalSuspensionModal = () => setShowGoalModal(false);
    const openGoalSuspensionModal = (id_user) => setShowGoalModal({
        show: true,
        id_user: id_user
    });

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
                        if(setGoalkeeper(api, row.original.id_matchup, row.original.goalkeeper)){
                            fetchMatchup();
                        }
                    }}
                    >
                        Změnit
                    </Button>
                </div>
            )
        },
        {
            Header: 'Akce',
            accessor: "id_matchup",
            filterable: false,
            Cell: row => (
                <div>
                    <Button variant="link" onClick={() => openGoalSuspensionModal(row.original.id_user)}>
                        <Image style={{ width: '2rem' }} src={addIcon} />
                    </Button>
                    <Button variant="link" onClick={() => handleDeletePlayer(row.original.id_matchup, row.original.id_user)}>
                        <Image style={{ width: '2rem' }} src={deleteIcon} />
                    </Button>
                </div>
            )
        }
    ];

    const handleAddPlayer = async (id_user) => {
        const result = await addPlayer(api, {id_team: id_team, id_match: id_match, id_user: id_user, host: host});
        if(result) {
            fetchMatchup();
            fetchAvailablePlayers();
        }
    };

    const handleDeletePlayer = async (id_matchup, id_user) => {
        const result = await deletePlayer(api, id_matchup, id_user);
        if(result) {
            fetchMatchup();
            fetchAvailablePlayers();
            fetchEvents();
        }
    };

    return (
        <div>
            <h2>Sestava</h2>
            {matchupState.isLoading &&  <div className="text-center"><Image src={loadingGif}/></div>}
            {(!matchupState.isLoading && matchupState.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!matchupState.isLoading && !matchupState.error) &&
                <div>
                    <CustomSelect name="id_type"
                                  options={availablePlayers.players}
                                  getOptionLabel={option => `${option.name}`}
                                  getOptionValue={option => `${option.id_user}`}
                                  placeholder={host ? "Hráči host" : "Hráči guest"}
                                  isSearchable={true}
                                  onChange={options => handleAddPlayer(options.id_user)}
                    />
                    <Table className="defaultCursor" columns={columnsMatchup} data={matchupState.matchup}/>
                    <AddGoalSuspensionModal params={showGoalModal} handleClose={closeGoalSuspensionModal} matchup={matchupState.matchup}
                                 id_team={id_team} id_match={id_match} host={host} fetchEvents={fetchEvents}
                    />
                </div>
            }
        </div>
    );

}
