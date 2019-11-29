import {useApi} from "../../hooks/useApi";
import {useEffect, useState} from "react";
import {config} from '../../config';

export function useGetSports() {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/others/sports`)
                .then(({data}) => {
                    const {sports} = data;
                    setState({isLoading: false, error: false, sports: sports});
                })
                .catch(() => {
                    setState({isLoading: false, error: true, sports: null});
                });
        }

        fetchData().then();
    }, [api]);
    return [state];
}

export function useGetTeamTypes() {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/others/teamTypes`)
                .then(({data}) => {
                    const {types} = data;
                    setState({isLoading: false, error: false, types: types});
                })
                .catch(() => {
                    setState({isLoading: false, error: true, types: null});
                });
        }

        fetchData().then();
    }, [api]);
    return [state];
}

export function useGetTeamPositions() {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/others/positions`)
                .then(({data}) => {
                    const {positions} = data;
                    setState({isLoading: false, error: false, positions: positions});
                })
                .catch(() => {
                    setState({isLoading: false, error: true, positions: null});
                });
        }

        fetchData().then();
    }, [api]);
    return [state];
}

