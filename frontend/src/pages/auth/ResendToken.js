import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useApi} from '../../utils/api';
import {useHistory} from 'react-router-dom';
import {config} from "../../config";

function useResendToken(url, params) {
    let {id_token, type} = params;
    const history = useHistory();
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });

    useEffect( () => {
        async function fetchData() {
            await api
                .post(url, {id_token: id_token, type: type})
                .then(({ data }) => {
                    setState({ isLoading: false });
                    window.flash("Nový link Vám byl zaslán na email", 'success');
                    history.replace('/');
                })
                .catch(({response}) => {
                    setState({isLoading: false});
                    const {data} = response;
                    window.flash(data.msg, 'danger');
                    history.replace('/');
                });
        }
        fetchData().then();
    }, [api, url, history, id_token, type]);

    return [state];
}

export function ResendToken() {
    const [state] = useResendToken(`${config.API_BASE_PATH}/auth/resendToken`, useParams());
    return (
        <div>
            {state.isLoading && <div>Resending token...</div>}
        </div>
    );
}
