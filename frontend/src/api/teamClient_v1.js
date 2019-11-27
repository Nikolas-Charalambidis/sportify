import {useApi} from "../hooks/useApi";
import {useEffect, useState} from "react";
import {config} from '../config';

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
                    // if(id_user){
                    //     let authorized = id_user === team.id_leader;
                    //     setState({isLoading: false, error: false, team_data: team, authorized: authorized});
                    // } else {
                    //     setState({isLoading: false, error: false, team_data: team});
                    // }
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

export function useGetTeamMembership(id_team, status) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/teamMembership/team/${id_team}?team_membership_status=${status}`)
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
    }, [api, id_team, status]);
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

export function ChangeTeamData(api, id_team, values, setHeading) {
    const {id_type, id_sport, id_leader, id_contact_person, name} = values;
    api
        .put(`${config.API_BASE_PATH}/teams/`, {id_team: id_team, id_type: id_type, id_leader: id_leader, id_sport: id_sport, id_contact_person: id_contact_person, name: name})
        .then(() => {
            window.flash("Tymove údaje byly úspěšně změněny", 'success');
            setHeading(name);
        })
        .catch(({response}) => {
            const { data } = response;
            window.flash(data.msg, 'danger');
        });
}

export function ChangeSetActive(api, id_team, active, setStatus, setActivationButtonState) {
    const path = `${config.API_BASE_PATH}/teams/${id_team}`;
    const promise = active === false ?
        api.patch(path)
            .then(({data}) => {
                window.flash("Tým byl úspěšně aktivován", 'success');
                setStatus(true);
                setActivationButtonState("Deaktivovat")
            })
    :
        api.delete(path)
            .then(({data}) => {
                window.flash("Tým byl úspěšně deaktivován", 'success');
                setStatus(false);
                setActivationButtonState("Aktivovat")
            });

    promise.catch(({response}) => {
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

export function useGetTeamMatches(id_team) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect( () => {
        async function fetchData() {
            api
                .get(`${config.API_BASE_PATH}/teams/${id_team}/matches`)
                .then(({ data }) => {
                    const { matches } = data;
                    setState({ isLoading: false, error: false, team_data: matches });
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

export function CreateTeam(history, api, id_user, values) {
    const {name, id_sport, id_type, id_position} = values;
    api
        .post(`${config.API_BASE_PATH}/teams`, {id_leader: id_user, name: name, id_sport: id_sport, id_type: id_type, id_position: id_position})
        .then(( { data } ) => {
            const { id_team } = data;
            window.flash(data.msg, 'success');
            history.replace(`/administration/teams/${id_team}`);
        })
        .catch(( { response } ) => {
            const { data } = response;
            window.flash(data.msg, 'danger');
            return data;
        });
}
