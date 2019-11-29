import {config} from "../config";

export async function setGoalkeeper(api, id_matchup, goalkeeper) {
    let result = false;
    await api.patch(`${config.API_BASE_PATH}/matchups/setGoalkeeper`, {id_matchup: id_matchup, goalkeeper: !goalkeeper})
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({response}) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
    return result;
}

export async function addPlayer(api, id_match, host, values) {
    let result = false;
    await api
        .post(`${config.API_BASE_PATH}/matchups/bulk`, {id_match: id_match, host: host, matchups: values})
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({response}) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
    return result;
}

export async function deletePlayer(api, id_matchup, id_user) {
    let result = false;
    await api
        .delete(`${config.API_BASE_PATH}/matchups/${id_matchup}/${id_user}`)
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({response}) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
    return result;
}