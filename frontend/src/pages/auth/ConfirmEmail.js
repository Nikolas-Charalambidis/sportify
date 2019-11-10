import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useApi} from '../../hooks/useApi';
import {useHistory} from 'react-router-dom';
import {config} from "../../config";

function Confirm(url, params) {
    let {id_user, hash} = params;
    const history = useHistory();
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });

    useEffect( () => {
        async function fetchData() {
            await api
                .post(url, {id_user: id_user, hash: hash})
                .then(({ data }) => {
                    setState({ isLoading: false });
                    window.flash("Váš email byl úspěšně ověřen, nyní se můžete přihlásit", 'success');
                    history.replace('/login');
                })
                .catch(({response}) => {
                    setState({isLoading: false});
                    const {data, status} = response;
                    if(status === 498){
                        window.flash(data.msg, 'warning', 15000, data.link);
                    } else {
                        window.flash(data.msg, 'danger');
                    }
                    history.replace('/');
                });
        }
        fetchData().then();
    }, [api, hash, id_user, url, history]);

    return [state];
}

export function ConfirmEmail() {
    const [state] = Confirm(`${config.API_BASE_PATH}/auth/confirmEmail`, useParams());
    return (
        <div>
            {state.isLoading && <div>Confirming email...</div>}
        </div>
    );
}
