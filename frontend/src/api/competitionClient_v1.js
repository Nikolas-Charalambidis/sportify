import {useApi} from "../hooks/useApi";
import {useEffect, useState} from "react";
import {config} from '../config';
import * as queryString from 'query-string';

export function useGetCompetitions() {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false,
        competitions: undefined
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/competitions`)
                .then(({data}) => {
                    const {competitions} = data;
                    setState({isLoading: false, error: false, competitions: competitions});
                })
                .catch(( { response } ) => {
                    const {data} = response;
                    setState({isLoading: false, error: true, competitions: null});
                    window.flash(data.msg, 'danger');
                });
        }

        fetchData().then();
    }, [api]);
    return [state];
}

export function useGetCompetitionDetail(id_competition) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false,
        competition_data: undefined
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/competitions/${id_competition}`)
                .then(({data}) => {
                    const {competition} = data;
                    setState({isLoading: false, error: false, competition_data: competition});
                })
                .catch(( { response } ) => {
                    const {data} = response;
                    setState({isLoading: false, error: true, competition_data: null});
                    window.flash(data.msg, 'danger');
                });
        }

        fetchData().then();
    }, [api, id_competition]);
    return [state];
}

export function useGetCompetitionsTeams(id_competition) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false,
        competitions_teams: undefined
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/competitions/${id_competition}/teams`)
                .then(({data}) => {
                    const {competitions} = data;
                    setState({isLoading: false, error: false, competitions_teams: competitions});
                })
                .catch(( { response } ) => {
                    const {data} = response;
                    setState({isLoading: false, error: true, competitions_teams: null});
                    window.flash(data.msg, 'danger');
                });
        }

        fetchData().then();
    }, [api, id_competition]);
    return [state];
}

export function useGetCompetitionsStatistics(id_competition, is_goalkeeper) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false,
        competitions_statistics: undefined
    });
    useEffect(() => {
        async function fetchData() {
            let queryParamObject = {
                is_goalkeeper: is_goalkeeper
            };
            const queryParam = queryString.stringify(queryParamObject);

            await api
                .get(`${config.API_BASE_PATH}/competitions/${id_competition}/statistics?` + queryParam)
                .then(({data}) => {
                    const {statistics} = data;
                    setState({isLoading: false, error: false, statistics: statistics});
                })
                .catch(( { response } ) => {
                    const {data} = response;
                    setState({isLoading: false, error: true, statistics: null});
                    window.flash(data.msg, 'danger');
                });
        }

        fetchData().then();
    }, [api, id_competition, is_goalkeeper]);
    return [state];
}
