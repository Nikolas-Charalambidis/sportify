import {useApi} from "../hooks/useApi";
import {useEffect, useState} from "react";
import {config} from '../config';

export function useGetCompetitions() {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
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
                    const {data, status} = response;
                    setState({isLoading: false, error: true, competitions: null});
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