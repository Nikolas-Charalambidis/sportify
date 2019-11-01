import {useApi} from "../../utils/api";
import {useEffect, useState} from "react";
import {config} from '../../config';

export function useGetTeam(id_team) {
    const api = useApi();
    const [state, setState] = useState({
        gettingData: true
    });
    useEffect(() => {
        async function fetchData() {
            await api
                .get(`http://${config.API_BASE_PATH}/api/v1/teams/${id_team}`)
                .then(({data}) => {
                    const {team} = data;
                    setState({gettingData: false, error: false, team_data: team});
                })
                .catch((error) => {
                    const {data, status} = error;
                    setState({gettingData: false, error: true, team_data: null});
                    switch (status) {
                        case 400:
                            window.flash(data.message, 'danger');
                            break;
                        case 500:
                            window.flash(data.message, 'warning');
                            break;
                        default:
                            window.flash(data.message, 'danger');
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
        .put(`http://${config.API_BASE_PATH}/api/v1/teams/`, {id_team: id_team, sport: sport, name: name})
        .then(() => {
            window.flash("Tymove údaje byly úspěšně změněny", 'success');
            // return {error: false, message: "Uživatelské údaje byly úspěšně změněny", type: "success"};
        })
        .catch(({response}) => {
            const {status} = response;
            switch (status) {
                case 400:
                    window.flash("error", 'danger');
                    return {error: true, message: "Error message", type: "danger"};
                case 500:
                    window.flash("error", 'danger');
                    return {error: true, message: "Error message", type: "danger"};
                default:
                    window.flash("error", "danger");
                    break;
            }
        });
}