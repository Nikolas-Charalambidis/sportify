import {config} from "../../config";

export function setGoalkeeper(api, id_matchup, goalkeeper) {
    api.patch(`${config.API_BASE_PATH}/matchups/setGoalkeeper`, {id_matchup: id_matchup, goalkeeper: !goalkeeper})
        .then(({data}) => {
            window.flash(data.msg, 'success');
            return true;
        })
        .catch(({response}) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
            return false;
        });
}

export async function addPlayer(api, values) {
    let result = false;
    await api
        .post(`${config.API_BASE_PATH}/matchups`, values)
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({response}) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
            result =  false;
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
            result =  false;
        });
    return result;
}