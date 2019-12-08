import {useApi} from "../hooks/useApi";
import {useCallback, useEffect, useRef, useState} from "react";
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

    const argsRef = useRef({ id_team, queryParam, api });
    useEffect(() => {
        argsRef.current = ({ id_team, queryParam, api });
    }, [id_team, queryParam, api]);

    const fetchData = useCallback(() => {
        const {id_team, queryParam, api} = argsRef.current;
        api
            .get(`${config.API_BASE_PATH}/teamMembership/team/${id_team}?` + queryParam)
            .then(({data}) => {
                const {players} = data;
                setState({isLoading: false, error: false, players: players});
            })
            .catch(() => {
                setState({isLoading: false, error: true, players: null});
            });
    }, []);

    useEffect( () => {
        fetchData();

    }, [api, id_match, id_team]); // eslint-disable-line
    return [state, fetchData];
}

    export async function changePlayerStatus(api, id_team, id_user, status) {
    let result = false;
    await api
        .patch(`${config.API_BASE_PATH}/teamMembership/team/${id_team}/user/${id_user}`, {status: status})
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({response}) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
    return result;
}

export async function addNewMember(api, id_team, id_user, id_position, status) {
    let result = false;
    await api
        .post(`${config.API_BASE_PATH}/teamMembership/team/${id_team}/user/${id_user}`, {status: status, id_position: id_position})
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({response}) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
    return result;
}