import {useApi} from "../hooks/useApi";
import {useCallback, useEffect, useRef, useState} from "react";
import { config } from '../config';
import moment from "moment";

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

export function useGetEvents(id_match, host) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false
    });

    const argsRef = useRef({ id_match, host, api });
    useEffect(() => {
        argsRef.current = ({ id_match, host, api });
    }, [id_match, host, api]);

    const fetchData = useCallback(() => {
        const { id_match, host, api } = argsRef.current;
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
    }, []);

    useEffect(() => {
        fetchData()
    }, [id_match, host, fetchData]);

    return [state, fetchData];
}

export function useGetMatchup(id_match, host) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false
    });

    const argsRef = useRef({ id_match, host, api });
    useEffect(() => {
        argsRef.current = ({ id_match, host, api });
    }, [id_match, host, api]);

    const fetchData = useCallback(() => {
        const { id_match, host, api } = argsRef.current;
        setState({isLoading: true, error: false, events: null});
        api
            .get(`${config.API_BASE_PATH}/matches/${id_match}/matchup/${host}`)
            .then(({data}) => {
                const {matchup} = data;
                setState({isLoading: false, error: false, matchup: matchup});
            })
            .catch(() => {
                setState({isLoading: false, error: true, matchup: null});
            });
    }, []);

    useEffect(() => {
        fetchData()
    }, [id_match, host, fetchData]);

    return [state, fetchData];
}

export function useGetShots(id_match, host) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false
    });

    useEffect( () => {
        const fetchData = () => {
            setState({isLoading: true, error: false, events: null});
            api
                .get(`${config.API_BASE_PATH}/matches/${id_match}/shots/${host}`)
                .then(({data}) => {
                    const {shots} = data;
                    setState({isLoading: false, error: false, shots: shots});
                })
                .catch(({response}) => {
                    setState({isLoading: false, error: true, shots: null});
                });
        };
        fetchData();
    }, [api, id_match, host]); // eslint-disable-line
    return [state];
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

export function useGetAllEvents(id_match) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect( () => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/matches/${id_match}/events`)
                .then(({data}) => {
                    const {events} = data;
                    setState({isLoading: false, error: false, events: events});
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

export function useCreateMatch(hostState, guestState, history) {
    const api = useApi();
    const today = moment().local().format("DD. MM. YYYY HH:mm");

    api
        .post(`${config.API_BASE_PATH}/matches`, { id_competition: 1, id_host: hostState.id_team, id_guest: guestState.id_team, date: today })
        .then(({ data }) => {
            //const { id_team } = data;
            window.flash(data.msg, 'success');
            history.replace(`/administration`);
        })
        .catch(({ response }) => {
            const { data } = response;
            window.flash(data.msg, 'danger');
            return data;
        });
}