import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../utils/api';
import { useHistory } from 'react-router-dom';
import {config} from "../../../../backend/config";

function Confirm(url, params){
    let { id_user, hash } = params;
    const history = useHistory();
    const api = useApi();
    const [state, setState] = useState({
        isConfirming: true
    });

    useEffect( () => {
        async function fetchData() {
            await api
                .post(url, {id_user: id_user, hash: hash})
                .then(({ data }) => {
                    setState({ isConfirming: false });
                    // const { user } = data;
                    // Do something - for example login user
                    window.flash("Váš email byl úspěšně ověřen", 'success');
                    history.replace('/');
                })
                .catch(( { response } ) => {
                    setState( { isLoading: false });
                    const { data, status } = response;
                    switch (status) {
                        case 400:
                            window.flash(data.message, 'danger');
                            history.replace('/');
                            break;
                        case 404:
                            window.flash(data.message, 'danger');
                            history.replace('/');
                            break;
                        case 498:
                            window.flash(data.message, 'danger');
                            history.replace('/');
                            break;
                        default:
                            window.flash(data.message, 'danger');
                            history.replace('/');
                            break;
                    }
                });
        }
        fetchData().then();
    }, [api, hash, id_user, url, history]);

    return [state];
}

export function ConfirmEmail() {
    let link = config.LOCAL ? 'localhost' : 'sportify.cz';
    const [state] = Confirm(`http://${link}:3001/api/v1/auth/confirmEmail`, useParams());
    return (
        <div>
            { state.isConfirming && <div>Confirming email...</div> }
        </div>
    );
}
