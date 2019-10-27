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
            .then(({ data, status }) => {
                setState({ isConfirming: false });
                // const { error, msg, user } = data;
                // if(!error){
                //     // Do something
                // } else {
                //     // Do something
                // }
            })
            .catch(error => {
                setState( { isConfirming: false });
                // Do something
            });
    };
    useEffect(() => {
        fetchData();
    });

    return [state, fetchData];
}

export function ConfirmEmail() {
    const [state] = Confirm('http://localhost:3001/api/v1/users/confirmEmail', useParams());
    return (
        <div>
            { state.isConfirming && <div>Confirming email...</div> }
        </div>
    );
}