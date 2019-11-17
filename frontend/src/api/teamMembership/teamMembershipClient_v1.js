import {useApi} from "../../hooks/useApi";
import { useEffect, useState} from "react";
import {config} from '../../config';

export function useGetAvailablePlayers(id_team, id_match) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });

    const fetchData = () => {
        api
            .get(`${config.API_BASE_PATH}/teamMembership/available/${id_team}/${id_match}`)
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
