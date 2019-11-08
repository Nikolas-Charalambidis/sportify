import {useApi} from "../../hooks/useApi";
import {useEffect, useState} from "react";
import {config} from '../../config';

export function useGetTeams() {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/teams`)
                .then(({data}) => {
                    const {teams} = data;
                    setState({isLoading: false, error: false, teams_data: teams});
                })
                .catch(( { response } ) => {
                    const {data, status} = response;
                    setState({isLoading: false, error: true, teams_data: null});
                    switch (status) {
                        case 400:
                            window.flash(data.msg, 'danger');
                            break;
                        case 500:
                            window.flash(data.msg, 'danger');
                            break;
                        default:
                            window.flash("Neočekávaná chyba", 'danger');
                            break;
                    }
                });
        }

        fetchData().then();
    }, [api]);
    return [state];
}

export function useGetTeam(id_team) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/teams/${id_team}`)
                .then(({data}) => {
                    const {team} = data;
                    setState({isLoading: false, error: false, team_data: team});
                })
                .catch(( { response } ) => {
                    const {data, status} = response;
                    setState({isLoading: false, error: true, team_data: null});
                    switch (status) {
                        case 400:
                            window.flash(data.msg, 'danger');
                            break;
                        case 500:
                            window.flash(data.msg, 'danger');
                            break;
                        default:
                            window.flash("Neočekávaná chyba", 'danger');
                            break;
                    }
                });
        }

        fetchData().then();
    }, [api, id_team]);
    return [state];
}

export function useGetMembers(id_team) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/teams/${id_team}/players`)
                .then(({data}) => {
                    const {players} = data;
                    setState({isLoading: false, error: false, players: players});
                })
                .catch(( { response } ) => {
                    const {data} = response;
                    setState({isLoading: false, error: true, players: null});
                    window.flash(data.msg, 'danger');
                });
        }

        fetchData().then();
    }, [api, id_team]);
    return [state];
}

export function useGetCompetitions(id_team) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/teams/${id_team}/competitionMembership`)
                .then(({data}) => {
                    const {comps} = data;
                    setState({isLoading: false, error: false, team_data: comps});
                })
                .catch(( { response } ) => {
                    const {data} = response;
                    setState({isLoading: false, error: true, team_data: null});
                    window.flash(data.msg, 'danger');
                });
        }

        fetchData().then();
    }, [api, id_team]);
    return [state];
}

export function ChangeTeamData(api, id_team, values) {
    const {id_type, id_sport, id_leader, id_contact_person, name} = values;
    api
        .put(`${config.API_BASE_PATH}/teams/`, {id_team: id_team, id_type: id_type, id_leader: id_leader, id_sport: id_sport, id_contact_person: id_contact_person, name: name})
        .then(() => {
            window.flash("Tymove údaje byly úspěšně změněny", 'success');
        })
        .catch(({response}) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
}

export function useGetTeamCompetition(id_team) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect( () => {
        async function fetchData() {
            api
                .get(`${config.API_BASE_PATH}/teams/${id_team}/competitionMembership`)
                .then(({ data }) => {
                    const { team } = data;
                    setState({ isLoading: false, error: false, team_data: team });
                })
                .catch(( { response } ) => {
                    const { data, status} = response;
                    setState({ isLoading: false, error: true, team_data: null });
                    switch (status) {
                        case 400:
                            window.flash(data.msg, 'danger');
                            break;
                        case 500:
                            window.flash(data.msg, 'danger');
                            break;
                        default:
                            window.flash("Neočekávaná chyba", 'danger');
                            break;
                    }
                });
        }
        fetchData().then();
    }, [api, id_team]);
    return [state];
}

export function useGetTeamStatistics(id_team) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect( () => {
        async function fetchData() {
            api
                .get(`${config.API_BASE_PATH}/teams/${id_team}/statistics`)
                .then(({ data }) => {
                    const { team_data } = data;
                    setState({ isLoading: false, error: false, team: team_data });
                })
                .catch(( { response } ) => {
                    const { data, status} = response;
                    setState({ isLoading: false, error: true, team: null });
                    switch (status) {
                        case 400:
                            window.flash(data.msg, 'danger');
                            break;
                        case 500:
                            window.flash(data.msg, 'danger');
                            break;
                        default:
                            window.flash("Neočekávaná chyba", 'danger');
                            break;
                    }
                });
        }
        fetchData().then();
    }, [api, id_team]);
    return [state];
}