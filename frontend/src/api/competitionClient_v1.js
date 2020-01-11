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

export function useGetCompetitionsPending(id_competition) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false,
        competitions: undefined
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/competitions/${id_competition}/teams?competition_membership_status=pending`)
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
    }, [id_competition, api]);
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

export function useGetCompetitionTeamsStatistics(id_competition) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true,
        error: false,
        competitions_teams: undefined
    });
    useEffect(() => {
        async function fetchData() {
            await api
            .get(`${config.API_BASE_PATH}/competitions/${id_competition}/teams/statistics`)
            .then(({data}) => {
                const competitions = data.statistics;
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

export function createCompetition(name, id_leader, id_sport, id_type, city, start_date, end_date, api, history) {
    api
        .post(`${config.API_BASE_PATH}/competitions`, { name: name, id_leader: id_leader, id_sport: id_sport, id_type: id_type, city: city, start_date: start_date, end_date: end_date })
        .then(({ data }) => {
            window.flash(data.msg, 'success');
            history.replace(`/competitions`);
        })
        .catch(({ response }) => {
            const { data } = response;
            window.flash(data.msg, 'danger');
            return data;
        });
}

export function editCompetition(id_competition, name, id_leader, city, api, history) {
    api
        .put(`${config.API_BASE_PATH}/competitions/${id_competition}`, { name: name, id_leader: id_leader, city: city })
        .then(({ data }) => {
            window.flash(data.msg, 'success');
        })
        .catch(({ response }) => {
            const { data } = response;
            window.flash(data.msg, 'danger');
            return data;
        });
}

export async function changeTeamStatus(api, values , id_team, status) {
    let result = false;
    const{id_competition} = values;
    await api
        .post(`${config.API_BASE_PATH}/competitionMembership/competition/${id_competition}/team/${id_team}`, {status: status})
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