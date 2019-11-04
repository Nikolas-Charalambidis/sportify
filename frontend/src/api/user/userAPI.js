import {useApi} from "../../utils/api";
import {useEffect, useState} from "react";
import {config} from '../../config';

export function useGetUser(id_user) {
    const api = useApi();
    const [state, setState] = useState({
        isLoading: true
    });
    useEffect( () => {
        async function fetchData() {
            api
                .get(`${config.API_BASE_PATH}/users/${id_user}`)
                .then(({ data }) => {
                    const { user } = data;
                    setState({ isLoading: false, error: false, user_data: user });
                })
                .catch(({response})   => {
                    const { data } = response;
                    setState({ isLoading: false, error: true, user_data: null });
                    window.flash(data.msg, 'danger');
                });
        }
        fetchData().then();
    }, [api, id_user]);
    return [state];
}

export function ChangeData(api, id_user, values) {
    const {name, surname} = values;
    api
        .put(`${config.API_BASE_PATH}/users/`, {id_user: id_user, name: name, surname: surname})
        .then(() => {
            window.flash("Uživatelské údaje byly úspěšně změněny", 'success');
        })
        .catch(( { response } ) => {
            const { data } = response;
            window.flash(data.msg, 'danger');
        });
}

export function ChangePassword(api, id_user, values) {
    const {oldPassword, newPassword1, newPassword2} = values;
    api
        .patch(`${config.API_BASE_PATH}/users/`, {id_user: id_user, oldPassword: oldPassword, newPassword1: newPassword1, newPassword2: newPassword2})
        .then(() => {
            window.flash("Heslo bylo úspěšně změněno", 'success');
        })
        .catch(( { response } ) => {
            const { data } = response;
            window.flash(data.msg, 'danger');
        });
}