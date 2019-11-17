import {useApi} from "../../hooks/useApi";
import { useEffect, useState} from "react";
import {config} from '../../config';

export function useGetMatch(id_match) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect( () => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/matches/${id_match}`)
                .then(({data}) => {
                    const {match} = data;
                    setState({isLoading: false, error: false, match: match});
                })
                .catch(( { response } ) => {
                    const {data} = response;
                    setState({isLoading: false, error: true, match: null});
                    window.flash(data.msg, 'danger');
                });
        }
        fetchData().then();
    }, [api, id_match]);
    return [state];
}

export function useGetMatchup(id_match, host) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    const fetchData = () => {
        api
            .get(`${config.API_BASE_PATH}/matches/${id_match}/matchup/${host}`)
            .then(({data}) => {
                const {matchup} = data;
                setState({isLoading: false, error: false, matchup: matchup});
            })
            .catch(() => {
                setState({isLoading: false, error: true, matchup: null});
            });
    };

    useEffect( () => {
        fetchData();
    }, [api, id_match]); // eslint-disable-line
    return [state, fetchData];
}

export function useGetEvents(id_match, host) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false
    });

    const fetchData = () => {
        setState({isLoading: true, error: false, events: null});
        api
            .get(`${config.API_BASE_PATH}/matches/${id_match}/events/${host}`)
            .then(({data}) => {
                const {events} = data;
                setState({isLoading: false, error: false, events: events});
            })
            .catch(() => {
                setState({isLoading: false, error: true, match: null});
            })
    };

    useEffect( () => {
        fetchData();
    }, [api, id_match, host]); // eslint-disable-line
    return [state, fetchData];
}

export async function deleteMatch(api, id_match) {
    let result = false;
    await api
        .delete(`${config.API_BASE_PATH}/matches/${id_match}`)
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({response}) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
            result =  false;
        });
    return result;
}
