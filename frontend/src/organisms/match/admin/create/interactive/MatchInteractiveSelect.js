import React, {useState} from 'react';
import {Heading} from "../../../../../atoms";
import Button from "react-bootstrap/Button";
import {MatchTeamSelect} from "../MatchTeamSelect";
import {MatchMatchupSingleCreateAdmin} from "../matchup/MatchMatchupSingleCreateAdmin";
import {MatchMatchupMultipleCreateAdmin} from "../matchup/MatchMatchupMultipleCreateAdmin";
import {Modal} from "react-bootstrap";

export function MatchInteractiveSelect({teamsState, hostState, guestState, setHostState, setGuestState, setMatchupSelected}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            {teamsState.isLoading && <div>Načítám data...</div>}
            {(!teamsState.isLoading && teamsState.error) && <div>Data se nepodařilo načíst</div>}
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
                    <Button variant="primary" onClick={() => {
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="modal-title">
                        <Heading size="md">Potvrzení sestavy</Heading>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Opravdu si přejete potvrdit sestavu? V interaktivním formuláři nebude možné ji změnit. Změny bude možné provést až v editačním formuláři po uložení zápasu</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={() => {
                        handleClose();
                        setMatchupSelected(true);
                    }}>
                        Potvrdit sestavu
                    </Button>
                    <Button variant="secondary" type="button" onClick={handleClose}>
                        Zavřít
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
