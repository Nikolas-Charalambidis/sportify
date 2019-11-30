import {useApi} from "../hooks/useApi";
import { useEffect, useState} from "react";
import {config} from '../config';
import * as queryString from 'query-string';

export function useGetAvailablePlayers(id_team, id_match, status) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });

    var queryParam;
    if (status !== undefined && status !== null) {
        queryParam = queryString.stringify({id_match: id_match, team_membership_status: status});
    } else queryParam = queryString.stringify({id_match: id_match});

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

    }, [api, id_match, id_team]);
    return [state, fetchData];
}
