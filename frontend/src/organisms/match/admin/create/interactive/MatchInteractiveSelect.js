import React, {useState} from 'react';
import {Heading} from "../../../../../basicComponents";
import Button from "react-bootstrap/Button";
import {MatchTeamSelect} from "../MatchTeamSelect";
import {MatchMatchupSingleCreateAdmin} from "../matchup/MatchMatchupSingleCreateAdmin";
import {MatchMatchupMultipleCreateAdmin} from "../matchup/MatchMatchupMultipleCreateAdmin";
import {LoadingGif} from "../../../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../../../basicComponents/DataLoadingError";
import {ConfirmMatchupModal} from "./ConfirmMatchupModal";

export function MatchInteractiveSelect({teamsState, hostState, guestState, setHostState, setGuestState, setMatchupSelected}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if(teamsState.isLoading) {
        return <LoadingGif />;
    }

    if(!teamsState.isLoading && teamsState.error) {
        return <DataLoadingError />;
    }

    return (
        <div>
            {(!teamsState.isLoading && !teamsState.error) &&
                <div>
                    <MatchTeamSelect teams={teamsState.teams_data}
                                     setHostState={setHostState} setGuestState={setGuestState} />

                    {(hostState.id_team && guestState.id_team) &&
                        <div>
                            <Heading size="lg" className="mt-5 h3MatchDetail text-left">Soupiska</Heading>
                            {hostState.id_team === guestState.id_team ?
                                <MatchMatchupSingleCreateAdmin interactive={true} hostState={hostState} guestState={guestState}
                                                               setHostState={setHostState} setGuestState={setGuestState}
                                /> :
                                <MatchMatchupMultipleCreateAdmin interactive={true} hostState={hostState} guestState={guestState}
                                                                 setHostState={setHostState} setGuestState={setGuestState}
                                />
                            }
                            <Button className="float-right" variant="primary" onClick={() => {
                                if(hostState.matchups.length > 0 && guestState.matchups.length > 0){
                                    handleShow();
                                } else {
                                    window.flash("Nemůžete potvrdit prázdnou soupisku. Vyberte prosím hráče u obou týmů.", "danger")
                                }
                            }} >
                                Potvrdit výběr hráčů
                            </Button>
                        </div>
                    }
                </div>
            }
            <ConfirmMatchupModal show={show} handleClose={handleClose} setMatchupSelected={setMatchupSelected} />
        </div>
    );
}
