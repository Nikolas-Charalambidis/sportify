import {useApi} from "../../utils/api";
import {useEffect, useState} from "react";
import {config} from '../../config';

export function useGetTeams() {
    const api = useApi();
    const [state, setState] = useState({
        gettingData: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/api/v1/teams`)
                .then(({data}) => {
                    const {teams} = data;
                    setState({gettingData: false, error: false, teams_data: teams});
                })
                .catch(( { response } ) => {
                    const {data, status} = response;
                    setState({gettingData: false, error: true, teams_data: null});
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
        gettingData: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/api/v1/teams/${id_team}`)
                .then(({data}) => {
                    const {team} = data;
                    setState({gettingData: false, error: false, team_data: team});
                })
                .catch(( { response } ) => {
                    const {data, status} = response;
                    setState({gettingData: false, error: true, team_data: null});
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
        gettingData: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`${config.API_BASE_PATH}/api/v1/teams/${id_team}/players`)
                .then(({data}) => {
                    const {team} = data;
                    setState({gettingData: false, error: false, team_data: team});
                })
                .catch(( { response } ) => {
                    const {data, status} = response;
                    setState({gettingData: false, error: true, team_data: null});
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

export function useChangeData(api, id_team, values) {
    const {sport, name} = values;
    api
        .put(`${config.API_BASE_PATH}/api/v1/teams/`, {id_team: id_team, sport: sport, name: name})
        .then(() => {
            window.flash("Tymove údaje byly úspěšně změněny", 'success');
            // return {error: false, message: "Uživatelské údaje byly úspěšně změněny", type: "success"};
        })
        .catch(({response}) => {
            const {data, status} = response;
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