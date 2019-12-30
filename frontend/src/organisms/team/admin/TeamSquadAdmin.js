import React from "react";
import {TeamSquad} from "../public/TeamSquad";
import {useGetTeamPlayersByStatus} from "../../../api/teamMembershipClient_v1";

export function TeamSquadAdmin({id_team}) {
    const [playersActiveState, fetchPlayersActiveState] = useGetTeamPlayersByStatus(id_team, "active");
    const [playersInactiveState, fetchPlayersInactiveState] = useGetTeamPlayersByStatus(id_team, "inactive");
    const [playersPendingState, fetchPlayersPendingState] = useGetTeamPlayersByStatus(id_team, "pending");
    const [playersDeclinedState, fetchPlayersDeclinedState] = useGetTeamPlayersByStatus(id_team, "declined");

    const status = [
        {
            "status": "active",
            "title": "Aaktivní hráči",
            "state": playersActiveState
        },
        {
            "status": "inactive",
            "title": "Neaktivní hráči",
            "state": playersInactiveState
        },
        {
            "status": "pending",
            "title": "Žádosti o členství",
            "state": playersPendingState
        },
        {
            "status": "declined",
            "title": "Zámítnuté žádosti",
            "state": playersDeclinedState
        }
    ];

    return (
        <div>
            {status.map((item, index) => (
                <div key={index}>
                    <h2 className="mt-4">{item.title}</h2>
                    <TeamSquad key={index} status={item.status} admin={true} playersState={item.state}
                               fetchActivePlayersState={fetchPlayersActiveState}
                               fetchInactivePlayersState={fetchPlayersInactiveState}
                               fetchPlayersPendingState={fetchPlayersPendingState}
                               fetchPlayersDeclinedState={fetchPlayersDeclinedState}
                    />
                </div>
            ))}
        </div>
    );
}