import React, { useState }  from 'react';
import 'react-table/react-table.css';
import { useHistory } from 'react-router-dom';
import { Heading } from '../../../../atoms';
import { Table } from '../../../../organisms/Table';
import Image from 'react-bootstrap/esm/Image';
import loadingGif from '../../../../assets/images/loading.gif';
import { useGetTeamPositions } from '../../../../api/others/othersClient_v1';
import { Button } from 'react-bootstrap';
import { AddGoalSuspensionModal } from "./events/AddGoalSuspensionModal";
import addIcon from "../../../../assets/images/add.png";

export function PlayersTable({ id_team, state, events, setEvent, host }) {
    const remappedState = state.players.map(item => item.player);
    const [positionsState] = useGetTeamPositions();
    let history = useHistory();

    const [showGoalModal, setShowGoalModal] = useState({ show: false });
    const closeGoalSuspensionModal = () => setShowGoalModal(false);
    const openGoalSuspensionModal = (id_user) => setShowGoalModal({
        show: true,
        id_user: id_user
    });

    function getRowPlayer(data) {
        const player = data._original;
        return player
    }

    function getGoals(data) {
        const player = getRowPlayer(data);
        const goals = events.filter(e => e.id_user === player.id_user && e.type === 'goal').length;
        return goals;
    };

    function getAssists(data) {
        const player = getRowPlayer(data);
        const assists1 = events.filter(e => e.id_assistance1 === player.id_user).length;
        const assists2 = events.filter(e => e.id_assistance2 === player.id_user).length;
        return assists1 + assists2;
    };

    function getSuspensions(data) {
        const player = getRowPlayer(data);
        const suspension = events.filter(e => e.id_user === player.id_user && e.type.includes("suspension")).length;        
        return suspension;
    }

    function addPenalty(data) {
        console.log("trest", data);
    };

    const columns = [
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
        {
            Header: 'Góly',
            Cell: ({ row }) => <span>{getGoals(row)}</span>
        },
        {
            Header: 'Astistence',
            Cell: ({ row }) => <span>{getAssists(row)}</span>
        },
        {
            Header: 'Trestné minuty',
            Cell: ({ row }) => <span>{getSuspensions(row)}</span>
        },
        {
            Header: 'Akce',
            Cell: ({ row }) => {
                return (
                    <span>
                        <Button variant="link" onClick={() => openGoalSuspensionModal(row._original.id_user)}>
                            <Image style={{ width: '2rem' }} src={addIcon} />
                        </Button>
                    </span>
                )
            }
        },
    ];

    const withPositions = !positionsState.isLoading && !positionsState.error;
    const withError =
    (!state.isLoading && state.error) ||
    (!positionsState.isLoading && positionsState.error);

    return (
        <div>
            {(state.isLoading || positionsState.isLoading) && (
            <div className="text-center">
                <Image src={loadingGif} />
            </div>
            )}
            {withError && (
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">
                Data se nepodařilo načíst
            </Heading>
            )}
            {remappedState && withPositions && (
            <Table columns={columns} data={remappedState}/>
            )}
            <AddGoalSuspensionModal params={showGoalModal} handleClose={closeGoalSuspensionModal} matchup={remappedState}
                id_team={id_team} events={events} setEvent={setEvent} host={host} />
        </div>
    );
}
