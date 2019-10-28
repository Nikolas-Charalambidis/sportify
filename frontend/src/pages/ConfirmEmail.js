import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../utils/api';

function Confirm(url, params){
    let { id_user, hash } = params;
    const api = useApi();
    const [state, setState] = useState({
        isConfirming: true
    });

    const fetchData = () => {
        api
            .post(url, {id_user: id_user, hash: hash})
            .then(({ data }) => {
                setState({ isConfirming: false });
                // const { user } = data;
                // Do something - for example login user
            })
            .catch(( { response } ) => {
                setState( { isLoading: false });
                const { data, status } = response;
                switch (status) {
                    case 400:
                        // Do something - show message/redirect...
                        console.log(status + ' ' + data.message);
                        break;
                    case 404:
                        // Do something - show message/redirect...
                        console.log(status + ' ' + data.message);
                        break;
                    case 498:
                        // Do something - show message/link to send new token...
                        console.log(status + ' ' + data.message);
                        break;
                    default:
                        // Do something - handle unresolved state
                        break;
                }
            });
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [state];
}

export function ConfirmEmail() {
    const [state] = Confirm('http://localhost:3001/api/v1/users/confirmEmail', useParams());
    return (
        <div>
            { state.isConfirming && <div>Confirming email...</div> }
        </div>
    );
}