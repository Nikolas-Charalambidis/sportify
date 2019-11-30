import {useApi} from "../hooks/useApi";
import { useEffect, useState} from "react";
import {config} from '../config';
import * as queryString from 'query-string';

export function useGetTeamPlayers(id_team) {
    return useGetTeamPlayersFiltered(id_team, null, null);
}

export function useGetTeamPlayersByStatus(id_team, status) {
    return useGetTeamPlayersFiltered(id_team, null, status);
}

export function useGetAvailableTeamPlayersForMatch(id_team, id_match) {
    return useGetTeamPlayersFiltered(id_team, id_match, "active");
}

export function useGetTeamPlayersFiltered(id_team, id_match, status) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });

    var queryParamObject = {};
    if (status !== undefined && status !== null) {
        queryParamObject.team_membership_status = status;
    }
    if (id_match !== undefined && id_match !== null) {
        queryParamObject.id_match = id_match;
    }

    const queryParam = queryString.stringify(queryParamObject);

    const fetchData = () => {
        api
            .get(`${config.API_BASE_PATH}/teamMembership/team/${id_team}?` + queryParam)
            .then(({data}) => {
                const {players} = data;
                setState({isLoading: false, error: false, players: players});
            })
            .catch(() => {
                setState({isLoading: false, error: true, players: null});
            });
    };

    useEffect( () => {
        fetchData();

    }, [api, id_match, id_team]); // eslint-disable-line
    return [state, fetchData];
}
