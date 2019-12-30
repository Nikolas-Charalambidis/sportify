import React, { useState } from 'react';
import {createMatch} from "../../../../api/matchClient_v1";
import {addPlayer} from "../../../../api/matchupClient_v1";
import {useApi} from "../../../../hooks/useApi";
import {addEvents} from "../../../../api/eventClient_v1";
import {MatchCreateFormComponent} from "./MatchCreateFormComponent";
import { MatchCreateInteractiveComponent } from "./MatchCreateInteractiveComponent";
import { useHistory } from 'react-router-dom';

export function MatchCreateParent({interactive}) {
    const api = useApi();

    const [hostState, setHostState] = useState({
        id_team: null,
        matchups: [],
        events: [],
        shots: 0
    });
    const [guestState, setGuestState] = useState({
        id_team: null,
        matchups: [],
        events: [],
        shots: 0
    });

    let history = useHistory();

    const handleCreateMatch = async () => {
        if (validateForm()) {
            setHostState({ ...hostState, host: true });
            setGuestState({ ...guestState, host: false });
            const id_match = await createMatch(api, hostState, guestState);
            if (id_match) {
                const result_host_matchup = await addPlayer(api, id_match, true, hostState.matchups.map(item => ({ ...item, id_team: hostState.id_team })));
                const result_guest_matchup = await addPlayer(api, id_match, false, guestState.matchups.map(item => ({ ...item, id_team: guestState.id_team })));

                const result_host_events = await addEvents(api, id_match, [
                    ...hostState.events, { id_user: null, type: "shot", id_team: hostState.id_team, id_assistance1: null, id_assistance2: null, minute: null, value: hostState.shots, host: true }
                ]);
                const result_guest_events = await addEvents(api, id_match, [
                    ...guestState.events, { id_user: null, type: "shot", id_team: guestState.id_team, id_assistance1: null, id_assistance2: null, minute: null, value: guestState.shots, host: false }
                ]);
                if (!result_host_matchup || !result_guest_matchup || !result_host_events || !result_guest_events) {
                    window.flash("Nepovedlo se uložit všechny záznamy. Pokud se zápas vytvořil, můžete ho dodatečně upravit, případně kontaktujte správce aplikace", "danger");
                } else {
                    window.flash("Zápas byl vytvořen", "success");
                    history.replace(`/administration`);
                }
            }
        }
    };

    const validateForm = () => {
        if(hostState.matchups.length > 0 && guestState.matchups.length > 0){
            return true;
        } else {
            window.flash("Nemůžete odeslat formulář s prázdnou soupiskou", "danger")
            return false;
        }
    };

    const params = {
        hostState: hostState,
        setHostState: setHostState,
        guestState: guestState,
        setGuestState: setGuestState
    };

    return (
        <div>
            {interactive ?
                <MatchCreateInteractiveComponent params={params} handleCreateMatch={handleCreateMatch}/> :
                <MatchCreateFormComponent params={params} handleCreateMatch={handleCreateMatch}/>
            }
        </div>
    );
}
