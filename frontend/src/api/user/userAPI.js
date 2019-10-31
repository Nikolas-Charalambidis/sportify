import {useApi} from "../../utils/api";
import {useEffect, useState} from "react";

export function GetUser(id_user) {
    const api = useApi();
    const [state, setState] = useState({
        gettingData: true
    });
    useEffect( () => {
        async function fetchData() {
            await api
                .get(`http://localhost:3001/api/v1/users/${id_user}`)
                .then(({ data }) => {
                    const { user } = data;
                    setState({ gettingData: false, error: false, user_data: user });
                })
                .catch(( { response } ) => {
                    const { data, status } = response;
                    setState({ gettingData: false, error: true, user_data: null });
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
    }, [api, id_user]);
    return [state];
}

export function ChangeData(api, id_user, name, surname) {
    api
        .put(`http://localhost:3001/api/v1/users/`, {id_user: id_user, name: name, surname: surname})
        .then(() => {
            window.flash("Uživatelské údaje byly úspěšně změněny", 'success');
            // return {error: false, message: "Uživatelské údaje byly úspěšně změněny", type: "success"};
        })
        .catch(( { response } ) => {
            const { status } = response;
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

export function ChangePassword(api, id_user, oldPassword, newPassword1, newPassword2) {
    api
        .patch(`http://localhost:3001/api/v1/users/`, {id_user: id_user, oldPassword: oldPassword, newPassword1: newPassword1, newPassword2: newPassword2})
        .then(() => {
            //result = {error: false, message: "Heslo bylo úspěšně změněno", type: "success"};
            window.flash("Heslo bylo úspěšně změněno", 'success');
        })
        .catch(( { response } ) => {
            const { data, status } = response;
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