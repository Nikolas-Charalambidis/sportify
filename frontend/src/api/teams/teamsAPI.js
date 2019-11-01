import {useApi} from "../../utils/api";
import {useEffect, useState} from "react";
import {config} from '../../config';

export function useGetTeams() {
    const api = useApi();
    const [state, setState] = useState({
        gettingData: true
    });
    useEffect( () => {
        async function fetchData() {
            await api
                .get(`http://${config.API_BASE_PATH}/api/v1/teams`)
                .then(({ data }) => {
                    const { teams } = data;
                    setState({ gettingData: false, error: false, teams_data: teams });
                })
                .catch(( error ) => {
                    const { data, status } = error;
                    setState({ gettingData: false, error: true, teams_data: null });
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
    }, [api]);
    return [state];
}